<script lang="ts" setup>
  import { ref } from "vue";

  const LABEL_TEXT = "Введи текст";

  // const emit = defineEmits<{ "update:model-value": [payload: number] }>();
  const emit = defineEmits(["update:model-value"]);

  const formValue = ref("");

  emit("update:model-value", "");

  function updateModelValue(payload: string) {
    emit("update:model-value", payload);
  }
</script>

<template>
  <q-card-section>
    <q-input
      v-model="formValue"
      type="text"
      debounce="500"
      :label="LABEL_TEXT"
      @update:model-value="updateModelValue"
    ></q-input>
  </q-card-section>
</template>

<style scoped></style>
