<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useWorkflowStore } from "@/store/modules/workflow";
  import WorkflowTabsRouter from "@/components/workflow_tabs_router/WorkflowTabsRouter.vue";
  import { useWrapperBlockStore } from "@/store/modules/wrapper_blocks";

  // useWrapperBlockStore().getApiAllModulesKeys();
  const wrapper_block_store = useWrapperBlockStore();
  const store_ready = ref(false);

  onMounted(async () => {
    await wrapper_block_store.getApiAllModulesKeys();
    store_ready.value = true;
  });
  const workflow = useWorkflowStore();
  const { current_tab } = storeToRefs(workflow);
</script>

<template>
  <!-- <h6>workflow VIEW</h6> -->
  <q-card>
    <q-btn :to="{ name: 'HomeScriptMenu' }" label="Back to script Menu"></q-btn>
    <q-card-section>
      <WorkflowTabsRouter v-if="current_tab && store_ready" />
    </q-card-section>
  </q-card>
</template>
