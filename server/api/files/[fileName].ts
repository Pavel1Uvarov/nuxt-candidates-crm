import { getRouterParams } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { fileName } = getRouterParams(event);
  const buffer = await useStorage(runtimeConfig.serverAssets).getItemRaw(
    decodeURIComponent(fileName)
  );

  if (!buffer) {
    throw createError({
      status: 500,
      statusMessage: "File not found",
      message: "File not found",
    });
  }

  return new Uint8Array(buffer);
});
