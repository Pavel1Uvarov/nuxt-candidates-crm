import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  try {
    return event.context.db;
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Unable to read data",
      message: "Unable to read data",
    });
  }
});
