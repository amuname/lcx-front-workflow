<script setup lang="ts">
  import WebTriggerForm from "@/components/trigger_forms/WebTriggerForm.vue";

  const ScheduleTriggerForm = WebTriggerForm;

  const TRIGGER_FORM_MAP = {
    web: WebTriggerForm,
    schedule: ScheduleTriggerForm,
  };

  const props = defineProps<{
    component_string: "web" | "schedule" | undefined;
  }>();
  const emit = defineEmits(["update:model-value"]);

  function onUpdateModelValue(payload: any) {
    console.warn("TRIGGER RouterLink", payload);
    emit("update:model-value", payload);
  }
</script>

<template>
  <component
    :is="TRIGGER_FORM_MAP[component_string]"
    v-if="component_string"
    @update:model-value="onUpdateModelValue"
  />
</template>

<style scoped></style>
