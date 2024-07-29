import { getRouterParams } from "h3";

export default defineEventHandler(async (event) => {
  const { fileName } = getRouterParams(event);
  const buffer = await useStorage("assets:server").getItemRaw(
    decodeURIComponent(fileName)
  );

  if (!buffer) {
    throw new Error("File not found");
  }

  return new Uint8Array(buffer);
});
