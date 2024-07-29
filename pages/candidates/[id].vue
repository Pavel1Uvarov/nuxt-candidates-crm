<script setup lang="ts">
import type { ICandidate } from "~/types/candidate.interface";

definePageMeta({
  title: 'Edit Candidate',
  layout: 'manage-candidate',
  validate: async (route) => {
    const idParam = route.params.id;

    const idAsNumber = Number(idParam);

    return !isNaN(idAsNumber) && /^\d+$/.test(String(idAsNumber));
  }
})

const route = useRoute()

const candidateId = Number(route.params.id)

const { getCandidate, updateCandidate, onError } = useCandidates()
const { data, isError, suspense, error } = getCandidate(candidateId)
const { mutate, isPending } = updateCandidate(candidateId)

const onSubmit = (candidate: ICandidate) => mutate(candidate)

onServerPrefetch(async () => await suspense())

watchEffect(() => {
  if (isError.value && error.value?.message) onError(error.value)
})
</script>

<template>
  <q-card class="q-pa-md">
    <CandidateForm :candidate="data" @on-submit="onSubmit" :loading="isPending" />
  </q-card>
</template>