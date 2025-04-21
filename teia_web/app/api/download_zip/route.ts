// app/api/download-folder/route.ts

import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";

async function generatePdfBuffer(token: string, id: string) {
  let browser;
  try {
    // Inicia o Puppeteer com as opções recomendadas para produção
    browser = await chromium.launch();
    const context = await browser.newContext();

    // Caso exista token, injete-o como cookie na página que será renderizada
    await context.addCookies([
      {
        name: "token",
        value: token,
        domain: "localhost:3000",
        path: "/",
        httpOnly: true,
        secure: false, // Defina como true se estiver usando HTTPS
      },
    ]);
    const page = await context.newPage();

    // URL da rota protegida que você quer transformar em PDF
    const urlProtegida = `http://localhost:3000/demandas/${id}`;
    await page.goto(urlProtegida, { waitUntil: "networkidle" });

    // Aguarda um seletor específico para garantir que a renderização esteja completa.
    // Altere '.container-principal' para um seletor que esteja presente na sua página.
    await page.waitForSelector(".flex");

    await page.evaluate(() => {
      // Removendo elementos específicos da página, por exemplo, um menu ou banner desnecessário
      const elementosRemover = document.querySelectorAll(".pdf");
      elementosRemover.forEach((el) => el.remove());

      // Alternativamente, você pode adicionar estilos para ocultar elementos:
      // const style = document.createElement('style');
      // style.innerHTML = `
      //   .elemento-desnecessario, .banner-publicidade { display: none !important; }
      // `;
      // document.head.appendChild(style);
    });

    // Gera o PDF com as configurações desejadas
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Mantém os backgrounds para preservar o layout
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    // Fecha o navegador
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "default_id";
  const folder = req.nextUrl.searchParams.get("folder") || "default_folder";
  const token = req.cookies.get("token")?.value;
  console.log(id);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  async function fetchResources(resourceType: "image" | "raw", prefix: string) {
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: `resource_type:${resourceType} AND folder:${prefix}`,
          max_results: 100,
        }),
      }
    );

    if (!result.ok) {
      const error = await result.text();
      throw new Error(error);
    }

    const data = await result.json();
    return data.resources as { secure_url: string; public_id: string }[];
  }

  try {
    // Busca arquivos do folder principal (PDFs, raw files)
    const documentos = await fetchResources("raw", folder);

    // Busca imagens da subpasta "fotos/"
    const imagens = await fetchResources("image", `${folder}/fotos`);

    const pdfBuffer = await generatePdfBuffer(token as string, id);

    const zip = new JSZip();

    zip.file("vistoria.pdf", pdfBuffer);

    // Adiciona os PDFs no zip
    for (const doc of documentos) {
      const res = await fetch(doc.secure_url);
      const buffer = await res.arrayBuffer();
      const filename = doc.public_id.replace(`${folder}/`, ""); // remove prefixo
      zip.file(filename, Buffer.from(buffer));
    }

    // Adiciona as imagens numa pasta no zip
    for (const img of imagens) {
      const res = await fetch(img.secure_url);
      const buffer = await res.arrayBuffer();
      const filename = img.public_id.replace(`${folder}/`, ""); // mantém estrutura de pasta
      zip.file(filename, Buffer.from(buffer));
    }

    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${folder}.zip`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
