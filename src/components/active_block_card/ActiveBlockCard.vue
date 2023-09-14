<script setup lang="ts">
  import { storeToRefs } from "pinia";
  // import { useWrapperBlockStore } from "@/store/modules/wrapper_blocks";
  import { ref, watch } from "vue";
  import SelectValuePlacement from "@/components/select_value_placement/SelectValuePlacement.vue";
  import ArgumentKeyForm from "@/components/argument_key_form/ArgumentKeyForm.vue";
  import OtherWrapperPlacement from "@/components/placement_forms/OtherWrapperPlacement.vue";
  import ContextPlacement from "@/components/placement_forms/ContextPlacement.vue";

  import { WrapperBlock } from "@/types/wrapper_block.interface";
  import {
    ArgPlacementWithMixed,
    ArgPlacementArrayWithMixed,
    ArgPlacement,
    ArgPlacementArray,
  } from "@/types/arg_placement.type";
  import { reactive } from "vue";
  import { ArgType } from "@/types/wrapper_block_arg.type";
  import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { useWorkflowStore } from "@/store/modules/workflow";
  // import { WrapperArgumentSchemaLocalValue } from "@/types/wrapper_argument_schema_value.type";

  const PLACEMENT_STATE_VALUES: ArgPlacementArrayWithMixed = [
    "local",
    "mixed",
    "other_wrapper",
    "context",
  ];

  // const blocks = useWrapperBlockStore();
  // const { block_modules_mock } = storeToRefs(blocks);
  const workflow = useWorkflowStore();
  const { work_tabs } = storeToRefs(workflow);

  const props = defineProps<{
    tabId: WorkflowTabInterface["id"];
    tabScript: WorkflowTabInterface["script"];
    currentBlockSchema: WrapperBlockSchema;
    currentBlock: WrapperBlock;
  }>();

  // const emit = defineEmits<{
  //   "update:model-value": [payload: number];
  // }>();

  // Object.freeze(props.activeBlock.wrapper_arguments.arg_schema);

  const wrapper_arguments_keys = Object.keys(
    props.currentBlock.wrapper_arguments.arg_schema
  );

  const placement_state_array = reactive<ArgPlacementArray>(
    PLACEMENT_STATE_VALUES.filter((e) => e !== "mixed") as ArgPlacementArray
  );

  const placement_state_model_value = ref<ArgPlacementWithMixed>(
    placement_state_array[0]
  );

  function updatePlacementStateArray(to: "local" | "mixed") {
    const placement_state_model_value_index = placement_state_array.indexOf(
      placement_state_model_value.value as never
    );
    placement_state_array[placement_state_model_value_index] = to;
    placement_state_model_value.value = to;
  }

  function createArgumentWrapperObject(placement: ArgPlacement) {
    return placement !== "context"
      ? Object.fromEntries(
          wrapper_arguments_keys.map((e) => {
            return [e, { placement, value: null }];
          })
        )
      : Object.assign({}, props.currentBlock.wrapper_arguments);
  }

  const last_local_mixed_value = reactive(createArgumentWrapperObject("local"));
  // const last_other_wrapper_value = reactive(
  //   createArgumentWrapperObject("other_wrapper")
  // );
  const last_context_value = reactive(createArgumentWrapperObject("context"));

  watch(last_local_mixed_value, (new_val) => {
    console.warn("watch", new_val);
    if (
      placement_state_array.includes("local" as never) ||
      placement_state_array.includes("mixed" as never)
    ) {
      const local_mixed_val = new_val as Record<
        string,
        { placement: ArgPlacement }
      >;

      const is_all_local = wrapper_arguments_keys.reduce(
        (acc, val) =>
          local_mixed_val[val].placement === "local" ? acc : false,
        true
      );

      if (is_all_local && placement_state_array.includes("local" as never))
        return;
      if (!is_all_local && placement_state_array.includes("mixed" as never))
        return;

      if (is_all_local) updatePlacementStateArray("local");
      if (!is_all_local) updatePlacementStateArray("mixed");
    }
  });

  function updateSelectValueModelValue(payload: ArgPlacementWithMixed) {
    placement_state_model_value.value = payload;
  }

  const update_wrapper_arguments_placement_map = wrapper_arguments_keys.reduce(
    (acc, val) => {
      acc[val] = updateArgKeyPlacement(val);
      return acc;
    },
    {} as Record<string, (arg: ArgPlacement) => void>
  );

  console.log("create keys val ", wrapper_arguments_keys);

  const update_wrapper_arguments_value_map = wrapper_arguments_keys.reduce(
    (acc, val) => {
      console.log("create keys val ", val);
      acc[val] = updateWrapperArgValue(val);
      return acc;
    },
    {} as Record<string, (arg: ArgPlacement) => void>
  );

  function updateArgKeyPlacement(arg_key: string) {
    return function (payload: ArgPlacement) {
      (last_local_mixed_value as any)[arg_key].placement = payload;
    };
  }

  function updateWrapperArgValue(arg_key: string) {
    return function (payload: string | ArgType) {
      console.log("updateWrapperArgValue key: ", arg_key, "payload: ", payload);
      (last_local_mixed_value as any)[arg_key].value = payload;
      workflow.updateWrapperBlockArguments(
        props.tabId,
        props.currentBlockSchema.id,
        {
          placement: placement_state_model_value.value,
          value: last_local_mixed_value,
        }
      );
    };
  }

  // function updateOtherWrapperArguments(payload: never) {
  //   // NOT IMPLEMENTED
  //   // IDK HOW CREATE HELPER TO ALL ARGUMENT VALUE
  //   // WORKS FINE WITHOUT IT
  // }

  function updateContextWrapperArguments(payload: WrapperBlockArguments) {
    last_context_value.arg_schema = payload.arg_schema;
    last_context_value.avalible_from = payload.avalible_from;
    workflow.updateWrapperBlockArguments(
      props.tabId,
      props.currentBlockSchema.id,
      last_context_value
    );
  }
</script>

<template>
  <q-card
    v-if="
      !(currentBlockSchema.id === 'start' || currentBlockSchema.id === 'end')
    "
  >
    <q-card-section>
      <SelectValuePlacement
        :avalible-from="placement_state_array"
        @update:model-value="updateSelectValueModelValue"
      />
    </q-card-section>
    <q-card-section>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <ArgumentKeyForm
        v-for="[arg_key, arg_value] of Object.entries(
          currentBlock.wrapper_arguments.arg_schema
        )"
        v-show="
          placement_state_model_value == 'local' ||
          placement_state_model_value == 'mixed'
        "
        :key="arg_key"
        :name="arg_value.name"
        :description="arg_value.description"
        :avalible-from="arg_value.avalible_from"
        :form-data-type="arg_value.type"
        :arg-key="arg_key"
        :wrapper-id="currentBlockSchema.id"
        :tab-script="tabScript"
        :res-type="currentBlock.wrapper_result_schema"
        @update:value-placement="
          update_wrapper_arguments_placement_map[arg_key]
        "
        @update:model-value="update_wrapper_arguments_value_map[arg_key]"
      />
      <!-- <OtherWrapperPlacement
        v-show="placement_state_model_value == 'other_wrapper'"
        :data-type="currentBlock.wrapper_arguments"
        :wrapper-id="currentBlockSchema.id"
        :tab-script="tabScript"
        :rest-type="currentBlock.wrapper_result_schema"
        @update:model-value="updateOtherWrapperArguments"
      /> -->
      <ContextPlacement
        v-if="placement_state_model_value == 'context'"
        :data-type="currentBlock.wrapper_arguments"
        @update:model-value="updateContextWrapperArguments"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
