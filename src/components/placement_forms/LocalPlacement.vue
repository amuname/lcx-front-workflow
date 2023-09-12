<script lang="ts" setup>
  import TypeNumber from "@/components/local_placement_forms/TypeNumber.vue";
  import TypeText from "@/components/local_placement_forms/TypeText.vue";

  const PRIMITIVE_TYPE_FORMS = {
    number: TypeNumber,
    text: TypeText,
    string: TypeText,
  };
  const props = defineProps<{ formType: "number" | "text" | "string" }>();

  const component = PRIMITIVE_TYPE_FORMS[props.formType];
  // const emit = defineEmits<{
  //   "update:model-value": [value: "local" | "other_wrapper" | "context"];
  // }>();
  const emit = defineEmits(["update:model-value"]);
  // console.log("component is => ", component);
  function updateModelValue(payload: any) {
    emit("update:model-value", payload);
  }
</script>

<template>
  <q-card-section>
    <component
      :is="component"
      @update:model-value="updateModelValue"
    ></component>
  </q-card-section>
</template>

<style scoped></style>
