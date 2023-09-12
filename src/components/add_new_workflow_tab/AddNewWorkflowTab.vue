<script lang="ts" setup>
  import { useRouter } from "vue-router";
  import { useWorkflowStore } from "@/store/modules/workflow";

  const router = useRouter();
  const workflow = useWorkflowStore();

  function addNewTabAndGoToWorkflow() {
    workflow.createTab();
    router.push({ name: "WorkflowView" });
  }
</script>

<template>
  <q-btn label="Add new workflow tab" @click="addNewTabAndGoToWorkflow"></q-btn>
</template>

<style scoped>
  .argument_key_form {
    width: 400px;
  }
</style>
