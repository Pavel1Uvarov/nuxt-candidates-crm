import { zfd } from "zod-form-data";
import { z } from "zod";

export const ICandidateSchema = zfd.formData({
  id: z.union([z.number(), z.string()]).optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  bio: z.string(),
  skills: zfd.repeatable(z.array(zfd.text()).min(1)),
  resume_file: z.union([zfd.file(z.instanceof(File)), z.string()]),
  github_url: z.string().optional(),
});
