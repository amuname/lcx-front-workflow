<script lang="ts" setup>
  import { ref } from "vue";
  import { BlitzForm, UpdateModelValueOrigin } from "blitzar";

  defineProps<{ name: string; schema: Array<Record<string, any>> }>();

  const formData = ref({});

  function onUpdateField(payload: {
    id: string;
    value: string;
    origin?: UpdateModelValueOrigin;
  }) {
    console.log(typeof payload, payload);
  }
</script>

<template>
  <q-card>
    <q-card-section>{Function - name} arguments card</q-card-section>
    <q-card-section>
      <BlitzForm
        v-model="formData"
        :schema="schema"
        :column-count="2"
        @update-field="onUpdateField"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
