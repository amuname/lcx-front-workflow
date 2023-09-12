<script setup lang="ts">
  import { saveScriptForTesting, saveScriptForProduction } from "@/http/api";

  const REQUEST_MAP = {
    SAVE_SCRIPT_FOR_TESTING: saveScriptForTesting,
    SAVE_SCRIPT_FOR_PRODUCTION: saveScriptForProduction,
  };

  const LABLE_MAP = {
    SAVE_SCRIPT_FOR_TESTING: "Save Script For Testing",
    SAVE_SCRIPT_FOR_PRODUCTION: "Save Script For Production",
  };

  const props = defineProps<{
    buttonType: "SAVE_SCRIPT_FOR_TESTING" | "SAVE_SCRIPT_FOR_PRODUCTION";
    scriptId: string;
    version: number;
  }>();

  const emit = defineEmits(["resp:update-error", "resp:update-ok"]);

  async function onClick() {
    const res = await REQUEST_MAP[props.buttonType](
      props.scriptId,
      props.version
    );
    if (res.status !== 202) emit("resp:update-error", res.statusText);
    else emit("resp:update-ok", res.data);
  }
</script>

<template>
  <q-btn :label="LABLE_MAP[buttonType]" @click="onClick"> </q-btn>
</template>

<style scoped></style>
