import { array, mixed, object, string } from "yup";
import { useForm } from "vee-validate";
import type { ICandidate } from "~/types/candidate.interface";

interface ICandidateForm extends Omit<ICandidate, "resume_file"> {
  resume_file: File | null;
  resume_url?: string | null;
}

const useCandidateForm = () => {
  const runtimeConfig = useRuntimeConfig();

  const schema = object<ICandidateForm>({
    first_name: string().required("First name is required"),
    last_name: string().required("Last name is required"),
    email: string().required("Email is required").email("Invalid email"),
    bio: string().optional(),
    skills: array().of(string().required("Skill is required")).min(1),
    resume_url: string().optional().nullable(),
    resume_file: mixed().when("resume_url", {
      is: (val: string | undefined | null) => val && val !== "",
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema
          .required()
          .test(
            "fileSize",
            "File size is too large",
            (value) =>
              value && (value as File).size <= runtimeConfig.public.maxFileSize
          ),
    }),
    github_url: string().url("Invalid URL").optional(),
  });

  const { defineField, handleSubmit, resetForm } = useForm<ICandidateForm>({
    validationSchema: schema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      skills: [""],
      resume_file: null,
      github_url: "",
    },
  });

  return {
    defineField,
    handleSubmit,
    resetForm,
  };
};

export default useCandidateForm;
