<script setup lang="ts">
defineProps<{ title: string, showGoBackLink?: boolean }>()
</script>

<template>
  <q-header elevated class="q-px-md">
    <q-toolbar>
      <NuxtLink v-show="showGoBackLink" :to="{ name: 'index' }">
        <q-icon name="arrow_back" size="md" color="white" />
      </NuxtLink>
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
