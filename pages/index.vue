<script setup lang="ts">
import type { ICandidate } from '~/types/candidate.interface';

definePageMeta({
  title: 'Home'
})

const { getAll } = useCandidates();
const { data } = await getAll()
</script>

<template>
  <div>
    <div class="q-pa-md row">
      <div class="col-12 col-md-2">
        <q-btn label="Add Candidate" icon="add" to="/candidates/new" class="full-width" />
      </div>
    </div>
    <CandidatesTable :candidates="data" />
  </div>
</template>