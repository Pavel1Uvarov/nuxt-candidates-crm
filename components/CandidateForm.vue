<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ICandidate } from "~/types/candidate.interface";

const props = defineProps<{
  candidate?: ICandidate,
  loading: boolean
}>();

const emit = defineEmits<{
  (event: 'onSubmit', data: ICandidate): void;
}>();

const { values, handleSubmit, resetForm } = useCandidateForm();

const showDownloadFile = ref<boolean>(false);

const onSubmit = handleSubmit((values) => {
  const { resume_url, ...filteredValues } = values;

  emit('onSubmit', {
    ...filteredValues,
    resume_file: values.resume_file ?? values.resume_url,
  } as ICandidate);
});

watch(() => props.candidate, (newCandidate) => {
  if (!newCandidate) return;

  const { resume_file } = newCandidate;

  showDownloadFile.value = typeof resume_file === 'string'

  resetForm({
    values: {
      ...newCandidate,
      resume_file: typeof resume_file === 'string' ? null : resume_file,
      resume_url: typeof resume_file === 'string' ? resume_file : null,
    }
  });
}, {
  immediate: true
});
</script>

<template>
  <q-form @submit="onSubmit" class="q-mx-auto">
    <Field name="first_name" v-slot="{ field, value, errorMessage }">
      <q-input :model-value="value" v-bind="field" label="First Name" placeholder="First Name" :error="!!errorMessage"
        :error-message="errorMessage" />
    </Field>
    <Field name="last_name" v-slot="{ field, value, errorMessage }">
      <q-input :model-value="value" v-bind="field" label="Last Name" placeholder="Last Name" :error="!!errorMessage"
        :error-message="errorMessage" />
    </Field>
    <Field name="email" v-slot="{ field, value, errorMessage }">
      <q-input :model-value="value" v-bind="field" placeholder="user@example.com" label="Email" :error="!!errorMessage"
        :error-message="errorMessage" />
    </Field>
    <Field name="bio" v-slot="{ field, value, errorMessage }">
      <q-input :model-value="value" v-bind="field" placeholder="Enter your bio" label="Bio" type="textarea"
        :error="!!errorMessage" :error-message="errorMessage" />
    </Field>
    <div>
      <p>Skills</p>
      <FieldArray name="skills" v-slot="{ fields, push, remove }">
        <q-list>
          <q-item v-for="(skill, index) in fields" :key="skill.key" class="q-pa-none">
            <q-item-section>
              <Field :name="`skills.${index}`" v-slot="{ field, value, errorMessage }">
                <q-input :model-value="value" v-bind="field" type="text" label="Skill" :error="!!errorMessage"
                  :error-message="errorMessage" />
              </Field>
            </q-item-section>
            <q-item-section v-if="fields.length > 1" side>
              <q-btn color="negative" icon="delete" @click="remove(index)" flat />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn class="q-mt-md" label="Add Skill" @click="push('')" color="primary" flat />
      </FieldArray>
    </div>
    <Field name="resume_file" v-slot="{ value, errorMessage, handleChange }">
      <q-file :model-value="value" @update:modelValue="handleChange" label="Resume File" :error="!!errorMessage"
        :error-message="errorMessage" />
    </Field>
    <div v-if="showDownloadFile && values.resume_url">
      <p>Uploaded Resume: <q-btn :href="`/api/files/${values.resume_url}`" target="_blank">Download</q-btn></p>
    </div>
    <Field name="github_url" v-slot="{ field, value, errorMessage }">
      <q-input :model-value="value" v-bind="field" placeholder="Enter your github URL" type="text" label="Github URL"
        :error="!!errorMessage" :error-message="errorMessage" />
    </Field>
    <q-btn class="q-mt-md" color="primary" label="Submit" type="submit" :loading="loading" :disable="loading" />
  </q-form>
</template>
