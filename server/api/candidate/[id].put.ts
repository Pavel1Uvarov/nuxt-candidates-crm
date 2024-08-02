import {
  createError,
  defineEventHandler,
  getRouterParams,
  readFormData,
} from "h3";
import { type ICandidate } from "~/types/candidate.interface";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const candidateId = Number(id);

  try {
    const formData = await readFormData(event);
    const { resume_file, ...candidate } = ICandidateSchema.parse(formData);
    const oldCandidate = event.context.db.find(
      (c: ICandidate) => c.id === candidateId
    );

    if (!oldCandidate) {
      throw createError({
        status: 404,
        statusMessage: "Candidate not found",
        message: "No candidate found with the given ID.",
      });
    }

    let db = event.context.db;

    const updatedResumeFile =
      resume_file && resume_file instanceof File
        ? await uploadFile(resume_file, oldCandidate.resume_file, true)
        : oldCandidate.resume_file;

    const updatedCandidate: ICandidate = {
      id: oldCandidate.id,
      resume_file: updatedResumeFile,
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
