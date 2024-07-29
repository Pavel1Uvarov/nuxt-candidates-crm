import { defineEventHandler, getRouterParams } from "h3";
import { ICandidate } from "~/types/candidate.interface";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  try {
    return event.context.db.find((c: ICandidate) => c.id === Number(id));
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Unable to read data",
      message: "Unable to read data",
    });
  }
});
