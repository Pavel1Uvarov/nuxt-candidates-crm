<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ICandidate } from "~/types/candidate.interface";
import { quasarConfig } from "~/utils/quasarConfig";

const props = defineProps<{
  candidate?: ICandidate,
  loading: boolean
}>();

const emit = defineEmits<{
  (event: 'onSubmit', data: ICandidate): void;
}>();

const { defineField, handleSubmit, resetForm } = useCandidateForm();

const [firstName, firstNameProps] = defineField('first_name', quasarConfig);
const [lastName, lastNameProps] = defineField('last_name', quasarConfig);
const [email, emailProps] = defineField('email', quasarConfig);
const [bio, bioProps] = defineField('bio', quasarConfig);
const [resumeFile, resumeFileProps] = defineField('resume_file', quasarConfig);
const [githubUrl, githubUrlProps] = defineField('github_url', quasarConfig);

const resumeFileUrl = ref<string>('');
const showDownloadFile = ref<boolean>(false);

const onSubmit = handleSubmit((values) => {
  const { resume_url, ...filteredValues } = values;

  emit('onSubmit', {
    ...filteredValues,
    resume_file: resumeFile.value ?? resumeFileUrl.value,
  } as ICandidate);
});

watch(() => props.candidate, (newCandidate) => {
  if (!newCandidate) return;

  const { resume_file } = newCandidate;

  if (typeof resume_file === 'string') {
    resumeFileUrl.value = resume_file;
    showDownloadFile.value = true;
  } else {
    showDownloadFile.value = false;
  }

  resetForm({
    values: {
      ...newCandidate,
      resume_file: typeof resume_file === 'string' ? null : resume_file,
      resume_url: resumeFileUrl.value,
    }
  });
}, {
  immediate: true
});
</script>

<template>
  <q-form @submit="onSubmit" class="q-mx-auto">
    <q-input v-model="firstName" v-bind="firstNameProps" label="First Name" placeholder="First Name" />
    <q-input v-model="lastName" v-bind="lastNameProps" label="Last Name" placeholder="Last Name" />
    <q-input v-model="email" v-bind="emailProps" placeholder="user@example.com" label="Email" />
    <q-input v-model="bio" v-bind="bioProps" placeholder="Enter your bio" label="Bio" type="textarea" />
    <div>
      <p>Skills</p>
      <FieldArray name="skills" v-slot="{ fields, push, remove }">
        <q-list>
          <q-item v-for="(skill, index) in fields" :key="skill.key" class="q-pa-none">
            <q-item-section>
              <Field :name="`skills.${index}`" v-slot="{ field, value, errorMessage }">
                <q-input :model-value="value" v-bind="field" type="text" label="Skill" :error-message="errorMessage"
                  :error="!!errorMessage" />
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
    <q-file v-model="resumeFile" v-bind="resumeFileProps" label="Resume File" />
    <div v-if="showDownloadFile && resumeFileUrl">
      <p>Uploaded Resume: <q-btn :href="`/api/files/${resumeFileUrl}`" target="_blank">Download</q-btn></p>
    </div>
    <q-input v-model="githubUrl" v-bind="githubUrlProps" placeholder="Enter your github URL" type="text"
      label="Github URL" />
    <q-btn class="q-mt-md" color="primary" label="Submit" type="submit" :loading="loading" :disable="loading" />
  </q-form>
</template>
