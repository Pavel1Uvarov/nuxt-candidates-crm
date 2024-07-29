import {
  createError,
  defineEventHandler,
  getRouterParams,
  readFormData,
} from "h3";
import { ICandidate } from "~/types/candidate.interface";

const runtimeConfig = useRuntimeConfig();

const updateFile = async (resume_file: File, oldFileName: string) => {
  try {
    const fileName = `${Date.now()}_${resume_file.name}`;
    const arrayBuffer = await resume_file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await useStorage("assets:server").removeItem(
      decodeURIComponent(oldFileName)
    );
    await useStorage("assets:server").setItemRaw(fileName, buffer);

    return fileName;
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to upload resume file",
    });
  }
};

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const candidateId = Number(id);

  try {
    const formData = await readFormData(event);
    let { id, resume_file, ...candidate } = ICandidateSchema.parse(formData);
    const oldCandidate = event.context.db.find(
      (c: ICandidate) => c.id === candidateId
    );

    let db = event.context.db;

    resume_file =
      resume_file && resume_file instanceof File
        ? await updateFile(resume_file, oldCandidate.resume_file)
        : oldCandidate.resume_file;

    const updatedCandidate: ICandidate = {
      id: candidateId,
      resume_file,
      ...candidate,
    };

    db = db.map((c: ICandidate) => {
      if (c.id === candidateId) {
        c = updatedCandidate;
      }
      return c;
    });

    await useStorage(runtimeConfig.dbStorage).setItem<ICandidate[]>(
      `data.json`,
      db
    );

    return updatedCandidate;
  } catch (err) {
    throw createError({
      status: 400,
      statusMessage: "Invalid user input",
      message: "Invalid user input",
    });
  }
});
