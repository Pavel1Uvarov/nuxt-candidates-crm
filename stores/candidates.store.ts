import type { ICandidate } from "~/types/candidate.interface";

const defaultValue: {
  candidates: ICandidate[];
} = {
  candidates: [],
};

export const useCandidatesStore = defineStore("candidates", {
  state: () => defaultValue,
  getters: {
    getCandidates: (state) => state.candidates,
    getCandidateById: (state) => {
      return (id: number) =>
        state.candidates.find((candidate) => candidate.id === id);
    },
  },
  actions: {
    setCandidates(candidates: ICandidate[]) {
      this.candidates = candidates;
    },
    addNewCandidate(candidate: ICandidate) {
      this.candidates.push(candidate);
    },
    updateCandidate(id: number, candidate: ICandidate) {
      const index = this.candidates.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.candidates[index] = candidate;
      }
    },
  },
});
