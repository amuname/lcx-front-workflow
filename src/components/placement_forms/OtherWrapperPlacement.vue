<script lang="ts" setup>
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { ArgType } from "@/types/wrapper_block_arg.type";
  import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";
  import { ResType } from "@/types/wrapper_block_result.type";
  import { predicateArgTypeOrWrapperBlockArguments } from "@/utils/arg_type_or_wrapper_arguments.predicate";
  import { computed, ref } from "vue";

  const PROC_FRILTER_NAME = "Выбери функцию";

  const props = defineProps<{
    dataType: ArgType | WrapperBlockArguments;
    argKey?: string;
    wrapperId: WrapperBlockSchema["id"];
    tabScript: WorkflowTabInterface["script"];
    restType: ResType;
  }>();

  // const emit = defineEmits<{
  //   // change: [id: number]; // named tuple syntax
  //   "update:model-value": [value: "local" | "other_wrapper" | "context"];
  // }>();

  const emit = defineEmits(["update:model-value"]);

  const arg_is_arg = predicateArgTypeOrWrapperBlockArguments(props.dataType);

  const formValue = ref("");

  const fromOptionInput = computed<
    { label: WrapperBlockSchema["wrapper"]; value: WrapperBlockSchema }[]
  >(() => {
    let wrapper_block_prev_id = props.tabScript[props.wrapperId].prev_id;

    // const result_list = [{label: props.tabScript[wrapper_block_prev_id].wrapper, value: props.tabScript[wrapper_block_prev_id]}]
    const result_list = [];

    while (wrapper_block_prev_id !== "start") {
      const wrapper = props.tabScript[wrapper_block_prev_id];
      if (arg_is_arg) {
        // const arg_key = props.argKey ? props.argKey : "";
        compareTuples(props.dataType, wrapper.wrapper_result_schema);
        result_list.push({
          label: wrapper.wrapper,
          value: wrapper,
        });
      }

      wrapper_block_prev_id = wrapper.prev_id;
    }

    return result_list;
  });

  function compareTuples(t0: string[], t1: string[]): boolean {
    let is_true = false;
    t0.forEach((e, i) => (is_true = e === t1[i]));
    return is_true;
  }
  // const fromOptionInput = [
  //   { value: "proc_id", label: "proc_name" },
  //   { value: "proc_id1", label: "asdfg" },
  //   { value: "proc_id2", label: "plmkoknd" },
  // ];

  const options = ref([...fromOptionInput.value]);

  function filterFn(val: string, update: (arg: () => void) => void) {
    if (val === "") {
      const fn = () => (options.value = fromOptionInput.value);
      update(fn);
      return;
    }

    const fn = () => {
      const needle = val.toLowerCase();
      options.value = fromOptionInput.value.filter(
        (v: { label: string; value: WrapperBlockSchema }) => {
          console.log("fin value www", v, "needle", needle);
          return v.label.toLowerCase().indexOf(needle) > -1;
        }
      );
    };
    update(fn);
  }

  function updateModelValue(payload: {
    label: WrapperBlockSchema["wrapper"];
    value: WrapperBlockSchema;
  }) {
    // console.log(payload);
    emit("update:model-value", payload.value.id);
  }
</script>

<template>
  <q-card-section>
    <q-select
      v-model="formValue"
      filled
      :error-message="'error'"
      use-input
      input-debounce="0"
      :label="PROC_FRILTER_NAME"
      :options="options"
      @filter="filterFn"
      @update:model-value="updateModelValue"
    >
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-card-section>
</template>

<style scoped></style>
