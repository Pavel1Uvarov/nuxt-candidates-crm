<script setup lang="ts">
const route = useRoute()

const title = computed<string>(() => (route.meta.title ?? 'Title') as string)

useHead({
  title: title
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <PageHeader :title="title" :show-go-back-link="true" />
    <q-page-container class="q-pa-md">
      <div class="row">
        <div class="col-3 q-mx-auto q-mt-lg">
          <slot />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
