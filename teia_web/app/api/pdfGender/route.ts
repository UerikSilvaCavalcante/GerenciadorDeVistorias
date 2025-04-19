// app/api/generate-pdf/route.js
import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

// Especifica que essa rota usará o runtime Node.js
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  let browser;
  try {
    // Obtém o token do cookie da requisição
    const token = request.cookies.get("token")?.value;
    const id = request.nextUrl.searchParams.get("id") || "default_id";

    // Inicia o Puppeteer com as opções recomendadas para produção
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Caso exista token, injete-o como cookie na página que será renderizada
    if (token) {
      await page.setCookie({
        name: "token",
        value: token,
        domain: "localhost:3000", // altere para o domínio da sua aplicação
        httpOnly: true,
        secure: true,
      });
    }

    // URL da rota protegida que você quer transformar em PDF
    const urlProtegida = `http://localhost:3000/demandas/${id}`;
    await page.goto(urlProtegida, { waitUntil: "networkidle0" });

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

    // Retorna a resposta com o PDF para download
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="info.pdf"',
      },
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    if (browser) await browser.close();
    return new NextResponse("Erro ao gerar PDF", { status: 500 });
  }
}
