import {
  CREATE_CANDIDATE_KEY,
  GET_CANDIDATE_BY_ID_KEY,
  GET_CANDIDATES_KEY,
  UPDATE_CANDIDATE_KEY,
} from "~/consts/api";
import type { ICandidate } from "~/types/candidate.interface";

const useCandidates = () => {
  const runtimeConfig = useRuntimeConfig();

  const getAll = () =>
    useQuery<ICandidate[]>({
      queryKey: [GET_CANDIDATES_KEY],
      queryFn: () => $fetch(`${runtimeConfig.public.apiBase}/candidates`),
      initialData: [] as ICandidate[],
      staleTime: 0,
    });

  const getCandidate = (candidateId: number) =>
    useQuery<ICandidate>({
      queryKey: [GET_CANDIDATE_BY_ID_KEY, candidateId],
      queryFn: () =>
        $fetch(`${runtimeConfig.public.apiBase}/candidate/${candidateId}`),
      retry: 0,
    });

  const createCandidate = () => {
    return useMutation({
      mutationKey: [CREATE_CANDIDATE_KEY],
      mutationFn: (candidate: ICandidate) => {
        const formData = prepareFormData(candidate);
        return $fetch(`${runtimeConfig.public.apiBase}/candidate`, {
          method: "POST",
          body: formData,
        });
      },
      onSuccess: () => onSuccess("Candidate was successfully created"),
      onError: (err: Error) => onError(err),
    });
  };

  const updateCandidate = (candidateId: number) => {
    return useMutation({
      mutationKey: [UPDATE_CANDIDATE_KEY, candidateId],
      mutationFn: (candidate: ICandidate) => {
        const formData = prepareFormData(candidate);
        return $fetch(
          `${runtimeConfig.public.apiBase}/candidate/${candidateId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      },
      onSuccess: () => onSuccess("Candidate was successfully updated"),
      onError: (err: Error) => onError(err),
    });
  };

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
