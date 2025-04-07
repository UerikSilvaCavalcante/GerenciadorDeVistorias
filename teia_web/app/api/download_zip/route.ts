// app/api/download-folder/route.ts

import JSZip from 'jszip';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get('folder') || 'default_folder';

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const result = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression: `folder:${folder}`,
      }),
    });

  if (!result.ok) {
    const error = await result.text();
    return NextResponse.json({ error }, { status: result.status });
  }

  const data = await result.json();
  const images = data.resources as { secure_url: string; public_id: string }[];

  const zip = new JSZip();

  for (const image of images) {
    const response = await fetch(image.secure_url);
    const buffer = await response.arrayBuffer();
    const filename = image.public_id.split('/').pop() || 'imagem.jpg';
    zip.file(filename, Buffer.from(buffer));
  }

  const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

  return new NextResponse(zipContent, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${folder}.zip`,
    },
  });
}
