<script setup lang="ts">
import type { ICandidate } from "~/types/candidate.interface";

definePageMeta({
  title: 'Add New Candidate',
  layout: 'manage-candidate'
})

const { createCandidate } = useCandidates()
const { mutate, isPending } = createCandidate()

const onSubmit = (candidate: ICandidate) => mutate(candidate)
</script>

<template>
  <q-card class="q-pa-md">
    <CandidateForm @on-submit="onSubmit" :loading="isPending" />
  </q-card>
</template>