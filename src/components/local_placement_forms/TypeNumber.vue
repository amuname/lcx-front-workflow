<script lang="ts" setup>
  import { ref } from "vue";

  const LABEL_TEXT = "Введи число";

  // const emit = defineEmits<{ "update:model-value": [payload: number] }>();
  const emit = defineEmits(["update:model-value"]);

  const formValue = ref("");

  emit("update:model-value", 0);

  function updateModelValue(payload: string) {
    emit(
      "update:model-value",
      Number(payload) || parseInt(payload) || parseFloat(payload) || 0
    );
  }
</script>

<template>
  <q-card-section>
    <q-input
      v-model="formValue"
      type="number"
      debounce="500"
      :label="LABEL_TEXT"
      @update:model-value="updateModelValue"
    ></q-input>
  </q-card-section>
</template>

<style scoped></style>
