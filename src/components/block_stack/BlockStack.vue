<script setup lang="ts">
  // import { storeToRefs } from "pinia";
  import { useWorkflowStore } from "@/store/modules/workflow";
  import { ref, computed, reactive } from "vue";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";
  import { storeToRefs } from "pinia";

  const workflow = useWorkflowStore();
  // const { current_tab_script } = storeToRefs(workflow);
  // const { c_script } = storeToRefs(workflow);

  // workflow.insertWrapperBlock;
  // workflow.removeWrapperBlock;
  // workflow.moveWrapperBlock;

  const props = defineProps<{
    tabId: WorkflowTabInterface["id"];
    tabScript: WorkflowTabInterface["script"];
    activeBlockId: WrapperBlockSchema["id"];
  }>();

  // const emit = defineEmits<{
  //   "update:model-value": [payload: number];
  //   "update:select-active-block": [payload: WrapperBlock];
  // }>();

  const emit = defineEmits([
    "update:select-active-block",
    "update:remove-active-block",
  ]);

  const start_wrapper_block: WrapperBlockSchema = reactive(
    props.tabScript["start"]
  );

  // const activeBlock = ref<WrapperBlock>(start_wrapper_block);

  // watch(c_script.value, () => console.error("WHFFFFFFFFF"));

  // временное решение чтобы не строить графы (ахахах нет ничего постояннее чем временное)
  const ordered_wrapper_blocks = computed(() => {
    const wrapper_blocks = [start_wrapper_block];
    // const wrapper_blocks: WrapperBlock[] = []
    let last_wrapper_block_id = "start";

    while (last_wrapper_block_id !== "end") {
      const next_wrapper_block_id =
        props.tabScript[last_wrapper_block_id].next[0].id;
      const next_wrapper_block = props.tabScript[next_wrapper_block_id];
      wrapper_blocks.push(next_wrapper_block);
      last_wrapper_block_id = next_wrapper_block.id;
    }
    console.warn("ordered_wrapper_blocks", wrapper_blocks);
    return wrapper_blocks;
  });

  function moveWrapperBlock(
    direction: "up" | "down",
    wrapper: WrapperBlockSchema
  ) {
    workflow.moveWrapperBlock(props.tabId, direction, wrapper);
  }

  function removeWrapperBlock(wrapper: WrapperBlockSchema) {
    emit("update:remove-active-block", wrapper);
    workflow.removeWrapperBlock(props.tabId, wrapper);
  }

  function setActiveBlock(wrapper: WrapperBlockSchema) {
    // console.error("setActiveBlock(wrapper: WrapperBlockSchema) ", wrapper);
    emit("update:select-active-block", wrapper);
    // activeBlock.value = wrapper;
  }
</script>

<template>
  <!-- <q-card> -->
  <q-card-section>
    <div
      v-for="wrapper in ordered_wrapper_blocks"
      :key="wrapper.id"
      class="text-h8"
    >
      <q-card flat bordered :class="{ active: wrapper.id === activeBlockId }">
        <template v-if="wrapper.id === activeBlockId">
          <q-card-section>
            <div>Module: {{ wrapper.module }}</div>
            <div>Function: {{ wrapper.wrapper }}</div>
            <q-btn-group
              v-if="!(wrapper.id === 'start' || wrapper.id === 'end')"
              flat
            >
              <q-btn
                :disable="wrapper.next[0].id === 'end'"
                flat
                icon="arrow_downward"
                @click="moveWrapperBlock('down', wrapper)"
              ></q-btn>
              <q-btn
                :disable="wrapper.prev_id === 'start'"
                flat
                icon="arrow_upward"
                @click="moveWrapperBlock('up', wrapper)"
              ></q-btn>
            </q-btn-group>
            <div>Description:</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              v-if="!(wrapper.id === 'start' || wrapper.id === 'end')"
              flat
              label="Delete"
              icon="delete"
              @click="removeWrapperBlock(wrapper)"
            ></q-btn>
          </q-card-section>
        </template>
        <template v-else>
          <q-card-section @click="setActiveBlock(wrapper)">
            <div>Module: {{ wrapper.module }}</div>
            <div>Function {{ wrapper.wrapper }}</div>
          </q-card-section>
        </template>
      </q-card>
    </div>
  </q-card-section>
  <!-- </q-card> -->
</template>

<style scoped>
  .active {
    border-color: rgb(125, 125, 125);
  }
</style>
