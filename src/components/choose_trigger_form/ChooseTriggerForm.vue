<script setup lang="ts">
  defineProps<{
    label: string;
  }>();

  const emit = defineEmits(["update:model-value"]);

  function onItemClick(payload: "web" | "schedule" | undefined) {
    console.warn("Dropdown payload", payload);
    emit("update:model-value", payload);
  }
</script>

<template>
  <q-btn-dropdown color="primary" :label="label">
    <q-list>
      <q-item v-close-popup clickable @click="() => onItemClick('web')">
        <q-item-section>
          <q-item-label>Web Trigger</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-close-popup clickable @click="() => onItemClick('schedule')">
        <q-item-section>
          <q-item-label>Schedule Trigger</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-close-popup clickable @click="() => onItemClick(undefined)">
        <q-item-section>
          <q-item-label>None</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped></style>
