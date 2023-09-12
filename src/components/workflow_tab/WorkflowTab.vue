<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useWorkflowStore } from "@/store/modules/one_tab_workflow";
  import { useWrapperBlockStore } from "@/store/modules/wrapper_blocks";
  import { ref, computed, reactive, unref } from "vue";
  import BlockStack from "@/components/block_stack/BlockStack.vue";
  import ActiveBlockCard from "@/components/active_block_card/ActiveBlockCard.vue";
  import SelectWrapperBlock from "@/components/select_wrapper_block/SelectWrapperBlock.vue";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { WrapperBlock } from "@/types/wrapper_block.interface";
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";

  // const workflow = useWorkflowStore();
  const block_store = useWrapperBlockStore();
  // const { c_script } = storeToRefs(workflow);
  const { block_modules_mock } = storeToRefs(block_store);
  const block_modules = block_modules_mock;

  const props = defineProps<{ current_tab: WorkflowTabInterface }>();

  // const emit = defineEmits<{
  //   "update:model-value": [payload: number];
  // }>();

  const init_seach_block = block_modules.value["StartEnd"].find(
    (e) => e.wrapper === "Start"
  ) as WrapperBlock;

  const active_block_card = ref(init_seach_block);

  // function onInsertWrapperBlock(wrapper_block: WrapperBlock) {
  //   workflow.insertWrapperBlock(
  //     wrapper_block.module,
  //     wrapper_block.wrapper,
  //     wrapper_block.wrapper_result_schema
  //   );

  //   active_block_card.value = wrapper_block;
  // }

  const activeBlockId = ref<string>("start");

  function onUpdateActiveBlockId(wrapper: WrapperBlockSchema) {
    activeBlockId.value = wrapper.id;
  }

  // function onRemoveActiveBlock (wrapper: WrapperBlockSchema) {
  //     const prev_wrapper = work_tabs.value[tab_id].script[wrapper.prev_id];
  //     // const next_wrapper = work_tabs.value[tab_id].script[wrapper.next[0].id]
  //     tabs_active_search_block[tab_id] = block_modules.value[
  //       prev_wrapper.module
  //     ].find((e) => e.wrapper === prev_wrapper.wrapper) as WrapperBlock;
  //     // tabs_active_blocks[tab_id] = wrapper;
  //     // workflow.setActiveTab(tab_id);
  //     tabs_active_blocks[tab_id] = prev_wrapper;
  //   }
</script>

<template>
  <q-card-section horizontal>
    <q-card-section>
      <!-- <ActiveBlockCard :active-block="active_block_card" /> -->
      <ActiveBlockCard
        :tab-id="current_tab.id"
        :tab-script="current_tab.script"
        :current-block-schema="current_tab.script[activeBlockId]"
        :current-block="active_block_card"
      />
    </q-card-section>
    <!-- <BlockStack
      :tab-script=""
      :active-block-id="activeBlockId"
      @update:select-active-block="onUpdateActiveBlockId"
    /> -->
    <BlockStack
      :tab-id="current_tab.id"
      :tab-script="current_tab.script"
      :active-block-id="activeBlockId"
      @update:remove-active-block="onRemoveActiveBlock(current_tab.id)"
      @update:select-active-block="onSelectActiveBlockBuilder(current_tab.id)"
    />
    <!-- </template> -->
  </q-card-section>
</template>

<style scoped></style>
