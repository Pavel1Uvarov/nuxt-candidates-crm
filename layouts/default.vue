<script setup lang="ts">
const route = useRoute()

const title = computed<string>(() => (route.meta.title ?? 'Title') as string)

useHead({
  title: title
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <PageHeader :title="title" />
    <q-page-container class="q-pa-md">
      <NuxtLoadingIndicator />
      <slot />
    </q-page-container>
  </q-layout>
</template>
