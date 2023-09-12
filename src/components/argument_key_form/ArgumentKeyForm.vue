<script lang="ts" setup>
  import { ref } from "vue";
  import SelectValuePlacement from "@/components/select_value_placement/SelectValuePlacement.vue";
  import LocalPlacement from "@/components/placement_forms/LocalPlacement.vue";
  import OtherWrapperPlacement from "@/components/placement_forms/OtherWrapperPlacement.vue";
  import ContextPlacement from "@/components/placement_forms/ContextPlacement.vue";
  import { ArgPlacement, ArgPlacementArray } from "@/types/arg_placement.type";
  import { computed } from "vue";
  import { ArgType } from "@/types/wrapper_block_arg.type";
  import { predicatePrimitiveArg } from "@/utils/arg_type.predicate";
  import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";
  import { WorkflowTabInterface } from "@/types/workflow_tab.type";
  import { WrapperBlockSchema } from "@/types/wrapper_block.type";
  import { ResType } from "@/types/wrapper_block_result.type";

  const props = defineProps<{
    avalibleFrom: ArgPlacementArray;
    formDataType: ArgType;
    argKey: string;
    wrapperId: WrapperBlockSchema["id"];
    tabScript: WorkflowTabInterface["script"];
    resType: ResType;
  }>();

  // const emit = defineEmits<{
  //   "update:model-value": [value: any];
  //   "update:value-placement": [value: "local" | "other_wrapper" | "context"]
  // }>();
  const emit = defineEmits(["update:model-value", "update:value-placement"]);

  const local_form_type = predicatePrimitiveArg(props.formDataType)
    ? (props.formDataType[1] as "number" | "text")
    : "text";

  // console.log("local_form_type", local_form_type);
  const avalible_from = computed<ArgPlacementArray>(() => {
    if (predicatePrimitiveArg(props.formDataType)) {
      return props.avalibleFrom;
    }
    return ["other_wrapper", "context"];
  });

  const placement_state = ref<ArgPlacement>();

  function selectValuePlacementUpdateModelValue(payload: ArgPlacement) {
    console.log(
      "ArgumentKeyForm selectValuePlacementUpdateModelValue => ",
      payload
    );
    placement_state.value = payload;
    emit("update:value-placement", payload);
  }

  function updateModelValue(payload: string | ArgType | WrapperBlockArguments) {
    console.log("ArgumentKeyForm updateModelValue => ", payload);
    emit("update:model-value", payload);
  }
</script>

<template>
  <!-- <q-card class="argument_key_form"> -->
  <q-card-section>
    <SelectValuePlacement
      :avalible-from="avalible_from"
      @update:model-value="selectValuePlacementUpdateModelValue"
    />
    <q-card-section>
      <LocalPlacement
        v-if="placement_state == 'local'"
        :form-type="local_form_type"
        :data-type="formDataType"
        @update:model-value="updateModelValue"
      />
      <OtherWrapperPlacement
        v-if="placement_state == 'other_wrapper'"
        :data-type="formDataType"
        :arg-key="argKey"
        :wrapper-id="wrapperId"
        :tab-script="tabScript"
        :rest-type="resType"
        @update:model-value="updateModelValue"
      />
      <ContextPlacement
        v-if="placement_state == 'context'"
        :data-type="formDataType"
        @update:model-value="updateModelValue"
      />
    </q-card-section>
  </q-card-section>
</template>

<style scoped>
  .argument_key_form {
    width: 400px;
  }
</style>
