const runtimeConfig = useRuntimeConfig();

export async function updateFile(
  resume_file: File,
  oldFileName?: string,
  removePrevFile?: boolean
): Promise<string> {
  try {
    const fileName = `${Date.now()}_${resume_file.name}`;

    const arrayBuffer = await resume_file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (removePrevFile && oldFileName) {
      await useStorage(runtimeConfig.serverAssets).removeItem(
        decodeURIComponent(oldFileName)
      );
    }

    await useStorage(runtimeConfig.serverAssets).setItemRaw(fileName, buffer);

    return fileName;
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to upload resume file",
    });
  }
}
