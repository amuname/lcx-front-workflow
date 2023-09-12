<script lang="ts" setup>
  import {
    ArgPlacementArray,
    ArgPlacement,
    ArgPlacementWithMixed,
    // ArgPlacementArrayNoLocal,
    ArgPlacementArrayWithMixed,
  } from "@/types/arg_placement.type";
  import { computed, ref, watch } from "vue";

  const avalible_form_labels = {
    local: "Свое значение",
    other_wrapper: "Значение из функции",
    context: "Значение из контекста",
    mixed: "Значения из разных источников",
  };

  const props = defineProps<{
    avalibleFrom: ArgPlacementArray | ArgPlacementArrayWithMixed;
  }>();

  // const emit = defineEmits<{
  //   // change: [id: number]; // named tuple syntax
  //   "update:model-value": [value: "local" | "other_wrapper" | "context"];
  // }>();

  const emit = defineEmits(["update:model-value"]);

  const formValues = computed(() =>
    props.avalibleFrom.map((e) => ({
      value: e,
      label: avalible_form_labels[e],
    }))
  );

  const formState = ref<ArgPlacement | ArgPlacementWithMixed>(
    props.avalibleFrom[0]
  );

  watch(formValues, async () => {
    if (!props.avalibleFrom.includes(formState.value))
      formState.value = props.avalibleFrom[0];
  });

  emit("update:model-value", props.avalibleFrom[0]);

  function updateModelValue(payload: ArgPlacement) {
    console.log("selectValuePlacement payload", payload);
    emit("update:model-value", payload);
    // setTimeout(() => console.log("formState.value : ", formState.value));
  }
</script>

<template>
  <q-card-section>
    <q-btn-toggle
      v-model="formState"
      toggle-color="grey"
      :options="formValues"
      @update:model-value="updateModelValue"
    />
  </q-card-section>
</template>

<style scoped></style>
