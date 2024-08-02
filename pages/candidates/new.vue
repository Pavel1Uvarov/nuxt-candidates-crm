<script setup lang="ts">
import type { ICandidate } from "~/types/candidate.interface";

definePageMeta({
  title: 'Add New Candidate',
  layout: 'manage-candidate'
})

const { createCandidate } = useCandidates()

const isSaving = ref<boolean>(false)

const onSubmit = async (candidate: ICandidate) => {
  isSaving.value = true
  await createCandidate(candidate)
  isSaving.value = false
}
</script>

<template>
  <q-card class="q-pa-md">
    <CandidateForm @on-submit="onSubmit" :loading="isSaving" />
  </q-card>
</template>
