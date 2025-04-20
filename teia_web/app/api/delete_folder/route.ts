import { NextRequest, NextResponse } from "next/server";


const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;
const auth =
  "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

async function listResources(
  folderPath: string,
  resourceType: string
): Promise<{ public_id: string }[]> {
  const expression = `resource_type:${resourceType} AND folder:${folderPath}`;
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression,
        max_results: 500,
      }),
    }
  );

  const data = await response.json();
  return data.resources || [];
}

async function deleteResources(
  publicIds: string[],
  resourceType: string
): Promise<void> {
  if (publicIds.length === 0) return;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      public_ids: publicIds,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro ao deletar recursos (${resourceType}): ${errText}`);
  }
}

/**
 * Deleta uma pasta (folder) dado o seu caminho.
 */
async function deleteFolderByPath(path: string): Promise<void> {
  const encodedFolder = encodeURIComponent(path);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodedFolder}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: auth,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro ao deletar a pasta "${path}": ${errText}`);
  }
}

export async function DELETE(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json(
      { error: 'Parâmetro "folder" é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    // 1. Trabalhando com o subfolder "fotos" (imagens)
    const subfolder = `${folder}/fotos`;
    // Listar imagens do subfolder
    const subfolderResources = await listResources(subfolder, "image");
    const subfolderPublicIds = subfolderResources.map((r) => r.public_id);
    if (subfolderPublicIds.length > 0) {
      await deleteResources(subfolderPublicIds, "image");
    }
    // Deletar o subfolder "fotos"
    try {
      await deleteFolderByPath(subfolder);
    } catch (subErr) {
      console.warn(`Aviso ao deletar subfolder "${subfolder}": ${subErr}`);
      // Se a exclusão do subfolder falhar, o fluxo pode continuar
    }

    // 2. Trabalhando com o folder principal (documentos PDF – resource_type raw)
    const mainResources = await listResources(folder, "raw");
    const mainPublicIds = mainResources.map((r) => r.public_id);
    if (mainPublicIds.length > 0) {
      await deleteResources(mainPublicIds, "raw");
    }
    // Deletar o folder principal
    await deleteFolderByPath(folder);

    return NextResponse.json({
      success: true,
      message: `Folder "${folder}" e subfolder "fotos" excluídos com sucesso.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro inesperado." },
      { status: 500 }
    );
  }
}
