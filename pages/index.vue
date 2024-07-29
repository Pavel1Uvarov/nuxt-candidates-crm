<script setup lang="ts">
definePageMeta({
  title: 'Home'
})

const { getAll } = useCandidates()

const { data, suspense, isError, error } = getAll()

onServerPrefetch(async () => await suspense())

watchEffect(() => {
  if (isError.value && error.value) Notify.create(error.value?.message)
})
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