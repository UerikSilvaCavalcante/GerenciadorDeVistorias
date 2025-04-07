import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const folderName = req.nextUrl.searchParams.get("folder") || "default_folder";

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const result = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression: `folder:${folderName} AND resource_type:image`,
      }),
    }
  );

  if (!result.ok) {
    const errorText = await result.text();
    return new NextResponse(errorText, { status: result.status });
  }

  const data = await result.json();
  return NextResponse.json(data);
}
