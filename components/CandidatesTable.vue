<script setup lang="ts">
import type { ICandidate } from "~/types/candidate.interface";
import type { QTableProps } from "quasar";

defineProps<{
  candidates: ICandidate[]
}>()

const columns: QTableProps['columns'] = [
  { name: 'full_name', label: 'Full Name', field: row => `${row.first_name} ${row.last_name}`, sortable: true, align: 'left' },
  { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
  { name: 'skills', label: 'Skills', field: 'skills', format: (val: string[]) => val.join(', '), align: 'left' },
  { name: 'actions', label: 'Actions', field: '' }
]

const filter = ref<string>('')
</script>

<template>
  <div class="q-pa-md">
    <q-table title="Candidates" :rows="candidates" :columns="columns" :filter="filter" row-key="id">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn :to="`/candidates/${props.row.id}`">
            Edit
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>