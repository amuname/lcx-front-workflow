<script setup lang="ts">
  import { updateScriptDraft } from "@/http/api";

  const props = defineProps<{
    scriptId: string;
    version: number;
    script: any;
    name: string;
    description: string;
    disable: boolean;
  }>();

  const emit = defineEmits(["resp:update-error", "resp:update-ok"]);

  async function onClick() {
    const res = await updateScriptDraft(
      props.scriptId,
      props.version,
      props.script
    );

    console.error("RSP ON SCRIPT updTE", res);
    if (res.status !== 200) emit("resp:update-error", res.statusText);
    else emit("resp:update-ok", res.data);
  }
</script>

<template>
  <q-btn label="Update Script Draft" :disable="disable" flat @click="onClick">
  </q-btn>
</template>

<style scoped></style>
