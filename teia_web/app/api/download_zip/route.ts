// app/api/download-folder/route.ts

import { PdfDocumento } from "@/app/components/pdfComponent";
import { renderToBuffer } from "@react-pdf/renderer";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

async function gen_pdf(
  id: number,
  token: string,
  type: number,
  idVistoria: number
) {
  let buffer;
  try {
    buffer = await renderToBuffer(
      await PdfDocumento({
        id: Number(id),
        idVistoria: Number(idVistoria),
        token: token as string,
        type: Number(type),
      })
    );
  } catch (err) {
    throw new Error(`Erro ao gerar PDF: ${err}`);
  }
  return buffer;
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "default_id";
  const folder = req.nextUrl.searchParams.get("folder") || "default_folder";
  const type = req.nextUrl.searchParams.get("type") || "default_type";
  const idVistoria =
    req.nextUrl.searchParams.get("idVistoria") || "default_idVistoria";
  const token = req.cookies.get("token")?.value;

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

    const zip = new JSZip();

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
    const pdfBuffer = await gen_pdf(
      Number(id),
      token as string,
      Number(type),
      Number(idVistoria)
    );
    zip.file(`os_${folder}.pdf`, pdfBuffer);

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
