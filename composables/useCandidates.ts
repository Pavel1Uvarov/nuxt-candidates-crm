import {
  CREATE_CANDIDATE_KEY,
  GET_CANDIDATE_BY_ID_KEY,
  GET_CANDIDATES_KEY,
  UPDATE_CANDIDATE_KEY,
} from "~/constants/api";
import type { ICandidate } from "~/types/candidate.interface";

const useCandidates = () => {
  const runtimeConfig = useRuntimeConfig();

  const getAll = async () =>
    await useFetch<ICandidate[]>(`${runtimeConfig.public.apiBase}/candidates`, {
      key: GET_CANDIDATES_KEY,
      default: () => [] as ICandidate[],
      onRequestError({ error }) {
        onError(error);
      },
    });

  const getCandidate = async (candidateId: number) =>
    await useFetch<ICandidate>(
      `${runtimeConfig.public.apiBase}/candidate/${candidateId}`,
      {
        key: `${GET_CANDIDATE_BY_ID_KEY}:${candidateId}`,
        default: () => ({} as ICandidate),
        onRequestError({ error }) {
          onError(error);
        },
      }
    );

  const createCandidate = async (candidate: ICandidate) =>
    await useFetch(`${runtimeConfig.public.apiBase}/candidate`, {
      key: CREATE_CANDIDATE_KEY,
      method: "POST",
      body: prepareFormData(candidate),
      onResponse() {
        onSuccess("Candidate was successfully created");
      },
      onRequestError({ error }) {
        onError(error);
      },
    });

  const updateCandidate = async (candidateId: number, candidate: ICandidate) =>
    await useFetch(`${runtimeConfig.public.apiBase}/candidate/${candidateId}`, {
      key: UPDATE_CANDIDATE_KEY,
      method: "PUT",
      body: prepareFormData(candidate),
      onResponse() {
        onSuccess("Candidate was successfully updated");
      },
      onRequestError({ error }) {
        onError(error);
      },
    });

  const onSuccess = (message: string) => {
    Notify.create(message);
    navigateTo("/");
  };

  const onError = (err: Error) => {
    Notify.create(err.message);
    navigateTo("/");
  };

  const prepareFormData = (candidate: ICandidate) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(candidate)) {
      if (Array.isArray(value)) {
        value.forEach((item: string, index) =>
          formData.append(`${key}[${index}]`, item)
        );
      } else if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    }

    return formData;
  };

  return {
    getAll,
    getCandidate,
    createCandidate,
    updateCandidate,
    onSuccess,
    onError,
  };
};

export default useCandidates;
