<script lang="ts" setup>
  import { ArgType } from "@/types/wrapper_block_arg.type";
  import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";

  const LABEL_TEXT = "Значение будет взято из контекста";

  const props = defineProps<{
    dataType: ArgType | WrapperBlockArguments;
  }>();
  // defineEmits<{ "update:model-value": [payload: ArgType | WrapperBlockArguments] }>();
  const emit = defineEmits(["update:model-value"]);
  console.log("CONTEXT PLACEMENT props.dataType => ", props.dataType);
  emit("update:model-value", props.dataType);
</script>

<template>
  <q-card-section>
    <q-input
      v-model="LABEL_TEXT"
      type="text"
      :label="LABEL_TEXT"
      readonly
    ></q-input>
  </q-card-section>
</template>

<style scoped></style>
