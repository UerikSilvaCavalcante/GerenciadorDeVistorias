// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;
  const folderName = data.get('folderName') as string

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await cloudinary.v2.uploader.upload_stream(
    {
      resource_type: 'raw', // ← importante pra PDF
      folder: `folder_${folderName}`, // nome da pasta
      public_id: `doc_${folderName}`, // nome do arquivo
    },
    (error, result) => {
      if (error) {
        console.error(error);
      }
      return result;
    }
  );

  const stream = require('stream');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);
  bufferStream.pipe(upload);

  return NextResponse.json({ success: true });
}
