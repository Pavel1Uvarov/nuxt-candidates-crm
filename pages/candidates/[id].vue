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

const { params } = useRoute()
const candidateId = Number(params.id)

const isSaving = ref<boolean>(false)

const { getCandidate, updateCandidate } = useCandidates()
const { data } = await getCandidate(candidateId)

const onSubmit = async (candidate: ICandidate) => {
  isSaving.value = true
  await updateCandidate(candidateId, candidate)
  isSaving.value = false
}
</script>

<template>
  <q-card class="q-pa-md">
    <CandidateForm :candidate="data" @on-submit="onSubmit" :loading="isSaving" />
  </q-card>
</template>
