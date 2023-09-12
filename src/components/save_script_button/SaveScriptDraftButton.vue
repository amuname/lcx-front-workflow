<script setup lang="ts">
  import { saveScriptAsDraft } from "@/http/api";

  const props = defineProps<{
    accountId: string;
    script: any;
    creatorId: string;
    name: string;
    description: string;
    disable: boolean;
  }>();

  const emit = defineEmits(["resp:save-error", "resp:save-ok"]);

  async function onClick() {
    const res = await saveScriptAsDraft(
      props.accountId,
      props.script,
      props.name,
      props.description,
      props.creatorId
    );
    if (res.status !== 201) emit("resp:save-error", res.statusText);
    else emit("resp:save-ok", res.data);
  }
</script>

<template>
  <q-btn label="Save Script As Draft" :disable="disable" flat @click="onClick">
  </q-btn>
</template>

<style scoped></style>
