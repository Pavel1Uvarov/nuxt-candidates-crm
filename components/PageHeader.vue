<script setup lang="ts">
defineProps<{ title: string, showGoBackLink?: boolean }>()
</script>

<template>
  <q-header elevated class="q-px-md">
    <q-toolbar>
      <q-btn v-show="showGoBackLink" flat icon="arrow_back" to="/" aria-label="Back" />
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
