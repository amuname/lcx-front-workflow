<script lang="ts" setup>
  const LABEL_TEXT = "Значение будет взято из контекста";
</script>

<template>
  <q-card-section>
    <q-input
      v-model="LABEL_TEXT"
      :type="'text'"
      :label="LABEL_TEXT"
      readonly
    ></q-input>
  </q-card-section>
</template>

<style scoped></style>
