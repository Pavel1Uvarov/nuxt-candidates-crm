import { defineEventHandler, readFormData, createError } from "h3";
import { type ICandidate } from "~/types/candidate.interface";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const db = event.context.db;
  const dbStorage = useStorage(runtimeConfig.dbStorage);

  try {
    const { id, resume_file, ...candidate } = ICandidateSchema.parse(formData);
    let fileName = "";

    if (resume_file && resume_file instanceof File)
      fileName = await uploadFile(resume_file);

    const newCandidate: ICandidate = {
      id: Date.now(),
      resume_file: fileName,
      ...candidate,
    };

    db.push(newCandidate);

    await dbStorage.setItem<ICandidate[]>(`data.json`, db);

    return newCandidate;
  } catch (error) {
    console.log(error);
    throw createError({
      status: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred",
    });
  }
});
