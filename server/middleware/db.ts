import { type ICandidate } from "~/types/candidate.interface";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const storage = useStorage(runtimeConfig.dbStorage);
  const data = await storage.getItem<ICandidate[]>("data.json");

  if (!data) {
    await storage.setItem<ICandidate[]>("data.json", []);
  }

  event.context.db = data ?? ([] as ICandidate[]);
});
