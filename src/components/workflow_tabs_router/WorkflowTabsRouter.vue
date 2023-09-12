<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useWorkflowStore } from "@/store/modules/workflow";
  import { useWrapperBlockStore } from "@/store/modules/wrapper_blocks";
  import { ref, computed, reactive, unref } from "vue";
  import BlockStack from "@/components/block_stack/BlockStack.vue";
  import ActiveBlockCard from "@/components/active_block_card/ActiveBlockCard.vue";
  import SelectWrapperBlock from "@/components/select_wrapper_block/SelectWrapperBlock.vue";
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { WrapperBlock } from "@/types/wrapper_block.interface";
  import SaveScriptDraftButton from "../save_script_button/SaveScriptDraftButton.vue";
  import UpdateScriptDraftButton from "../save_script_button/UpdateScriptDraftButton.vue";
  import { useUserAndAccountStore } from "@/store/modules/user_and_account";

  const user_and_account = useUserAndAccountStore();

  const workflow = useWorkflowStore();
  const block_store = useWrapperBlockStore();
  const { work_tabs, current_tab } = storeToRefs(workflow);
  const { block_modules } = storeToRefs(block_store);
  // const block_modules = block_modules_mock;

  console.warn("setup init");
  // const props =
  //   defineProps<{ tab: WorkflowTabInterface; activeBlock: WrapperBlock }>();

  // const emit = defineEmits<{
  //   "update:model-value": [payload: number];
  // }>();
  // if (current_tab.value) workflow.createTab();

  // const work_tabz = computed(() => work_tabs.value);
  const tabs_list = reactive(Object.values(work_tabs.value));

  const tabs_keys = reactive(Object.keys(work_tabs.value));

  console.log("tabs_keys", tabs_keys);
  // if (tabs_keys.length) workflow.createTab();

  // console.log("tabs_keys", tabs_keys);
  // const current_tab_active_block = ref<WrapperBlockSchema>(
  //   current_tab.value.script["start"]
  // );
  const tabs_active_blocks = reactive(
    Object.entries(unref(work_tabs)).reduce((acc, [key, val]) => {
      acc[key] = val.script["start"];
      return acc;
    }, {} as Record<string, WrapperBlockSchema>)
  );

  const init_search_block = block_modules.value["StartEnd"].find(
    (e) => e.wrapper === "Start"
  ) as WrapperBlock;

  // const init_seach_block = block_data.value["StartEnd"].find((e)=>e.wrapper ==="Start")
  const tabs_active_search_block = reactive(
    Object.keys(work_tabs.value).reduce((acc, key) => {
      acc[key] = init_search_block;
      return acc;
    }, {} as Record<string, WrapperBlock>)
  );

  const tabs_listeners = reactive(
    tabs_keys.reduce((acc, tab_key) => {
      acc[tab_key] = {
        wr_block: onActiveWrapperBlockOnTabChangeBuilder(tab_key),
        wr_schema: onSelectActiveBlockBuilder(tab_key),
        wr_remove: onRemoveActiveBlockBuilder(tab_key),
      };
      return acc;
    }, {} as Record<string, { wr_block: (arg: WrapperBlock) => void; wr_schema: (arg: WrapperBlockSchema) => void; wr_remove: (arg: WrapperBlockSchema) => void }>)
  );

  function onSelectActiveBlockBuilder(tab_id: string) {
    return function (wrapper: WrapperBlockSchema) {
      tabs_active_blocks[tab_id] = wrapper;
      tabs_active_search_block[tab_id] = block_modules.value[
        wrapper.module
      ].find((e) => e.wrapper === wrapper.wrapper) as WrapperBlock;
      // workflow.setActiveTab(tab_id);
    };
  }

  function onActiveWrapperBlockOnTabChangeBuilder(tab_id: string) {
    return async function (wrapper_block: WrapperBlock) {
      tabs_active_search_block[tab_id] = wrapper_block;
      const wrapper_block_schema = workflow.insertWrapperBlock(
        tab_id,
        wrapper_block.module,
        wrapper_block.wrapper,
        wrapper_block.wrapper_result_schema
      );

      tabs_active_blocks[tab_id] = wrapper_block_schema;
    };
  }

  function onRemoveActiveBlockBuilder(tab_id: string) {
    return function (wrapper: WrapperBlockSchema) {
      const prev_wrapper = work_tabs.value[tab_id].script[wrapper.prev_id];
      // const next_wrapper = work_tabs.value[tab_id].script[wrapper.next[0].id]
      tabs_active_search_block[tab_id] = block_modules.value[
        prev_wrapper.module
      ].find((e) => e.wrapper === prev_wrapper.wrapper) as WrapperBlock;
      // tabs_active_blocks[tab_id] = wrapper;
      // workflow.setActiveTab(tab_id);
      tabs_active_blocks[tab_id] = prev_wrapper;
    };
  }

  function saveScriptAsDraft(
    tab_id: string,
    payload: {
      id: string;
      name: string;
      description: string;
      creator_id: string;
      account_id: string;
    }
  ) {
    console.log(payload);
    workflow.updateScriptId(tab_id, payload.id);
  }

  function handleErrorSaveAsDraft(payload: any) {
    console.error(payload);
  }

  function updateSaveScriptAsDraft(payload: any) {
    console.log(payload);
  }

  function handleErrorUpdateAsDraft(payload: any) {
    console.error(payload);
  }

  function myFunction(block: WrapperBlockSchema) {
    // const un_block = unref(block)
    const mhgcrjgfdhfkvjgtkct = block_modules.value[block.module].find((e) => {
      console.log(
        "e.wrapper === block.wrapper",
        e.wrapper === block.wrapper,
        "e.wrapper",
        e.wrapper,
        "block.wrapper",
        block.wrapper
      );
      return e.wrapper === block.wrapper;
    });
    console.log("mhgcrjgfdhfkvjgtkct", mhgcrjgfdhfkvjgtkct);
  }

  // console.log(
  //   "tabs_active_blocks[" + tabs_list[0].id + "]",
  //   tabs_active_blocks[tabs_list[0].id]
  // );
  // console.log(
  //   "tabs_isteners[" + tabs_list[0].id + "]",
  //   tabs_isteners[tabs_list[0].id]
  // );
</script>

<template>
  <!-- <q-card> -->
  <!-- <q-card-section> -->
  <q-card-section>
    <!-- <q-card-section v-for="(tab, index) of tabs_list" :key="tab.id">
        <span>Tab {{ index + 1 }}</span>
      </q-card-section> -->
    <q-card-section>
      <template v-for="(tab, index) of tabs_list" :key="tab.id">
        <q-btn
          :flat="current_tab.id === tab.id"
          :disable="current_tab.id === tab.id"
          @click="() => workflow.setActiveTab(tab.id)"
        >
          Tab {{ index }}
        </q-btn>
      </template>
    </q-card-section>
    <!-- <template> -->
    <q-card-section horizontal>
      <q-card-section style="width: 78%">
        <q-card-section horizontal>
          <q-input
            label="script name"
            type="text"
            :debounce="500"
            :model-value="current_tab.name"
            @update:model-value="($event: string) => current_tab.name = $event"
          ></q-input>
          <q-input
            label="script description"
            type="text"
            :debounce="500"
            :model-value="current_tab.description"
            @update:model-value="($event: string) => current_tab.description = $event"
          ></q-input>
        </q-card-section>
        <SelectWrapperBlock
          @update:model-value="tabs_listeners[current_tab.id].wr_block"
        >
          <UpdateScriptDraftButton
            v-if="current_tab.script_id"
            :script-id="current_tab.script_id"
            :script="current_tab.script"
            :version="current_tab.version"
            :description="current_tab.description"
            :name="current_tab.name"
            :disable="Object.keys(current_tab.script).length < 3"
            @resp:update-ok="updateSaveScriptAsDraft"
            @resp:update-error="handleErrorUpdateAsDraft"
          />
          <SaveScriptDraftButton
            v-else
            :account-id="user_and_account.current_account?.accountId"
            :creator-id="user_and_account.current_account?.userId"
            :script="current_tab.script"
            :description="current_tab.description"
            :name="current_tab.name"
            :disable="Object.keys(current_tab.script).length < 3"
            @resp:save-ok="
              ($event) => saveScriptAsDraft(current_tab.id, $event)
            "
            @resp:save-error="handleErrorSaveAsDraft"
          />
        </SelectWrapperBlock>
        <template
          v-for="block of Object.values(current_tab.script)"
          :key="block.id"
        >
          <ActiveBlockCard
            v-show="block.id === tabs_active_blocks[current_tab.id].id"
            :tab-id="current_tab.id"
            :dasdvk="myFunction(block)"
            :tab-script="current_tab.script"
            :current-block-schema="block"
            :current-block="
              block_modules[block.module].find(
                (e) => e.wrapper === block.wrapper
              ) as WrapperBlock
            "
          />
        </template>
      </q-card-section>
      <BlockStack
        style="width: 22%"
        :tab-id="current_tab.id"
        :tab-script="current_tab.script"
        :active-block-id="tabs_active_blocks[current_tab.id].id"
        @update:remove-active-block="tabs_listeners[current_tab.id].wr_remove"
        @update:select-active-block="tabs_listeners[current_tab.id].wr_schema"
      />
      <!-- </template> -->
    </q-card-section>
  </q-card-section>
  <!-- </q-card-section> -->
  <!-- </q-card> -->
</template>

<style scoped></style>
