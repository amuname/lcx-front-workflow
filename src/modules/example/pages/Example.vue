<script lang="ts" setup>
  // import FormCard from "@/components/FormCard.vue";
  // import { patchSchemaRecursive } from "../../../utils/patch_schema_recursive";
  // import { BlitzSchema } from "@/types/schema.interface";
  // import FormCardWrapper from "@/components/FormCardWrapper.vue";

  import WorkflowTabsRouter from "@/components/workflow_tabs_router/WorkflowTabsRouter.vue";
  import { WrapperBlock } from "@/types/wrapper_block.interface";
  // import SelectValuePlacement from "@/components/select_value_placement/SelectValuePlacement.vue";
  // import SelectPlacementForm from "@/components/select_placement_form/SelectPlacementForm.vue";

  // patchSchemaRecursive(schema);
  // const arg_schema = {
  //   eu_citizen: {
  //     type: ["primitive", "boolean"],
  //   },
  //   select_proc: {
  //     type: ["module", "String", "proc", "Trim"],
  //   },
  // };

  // const result_schema = ["primitive", "boolean"];

  // const formkit_schema = [
  //   {
  //     $cmp: "FormKit",
  //     props: {
  //       name: "eu_citizen",
  //       type: "checkbox",
  //       id: "eu",
  //       value: false,
  //       label: "Are you a european citizen?",
  //     },
  //   },
  //   {
  //     $cmp: "FormKit",
  //     props: {
  //       name: "select_proc",
  //       type: "select",
  //       id: "eu",
  //       value: undefined,
  //       label: "Are you a european citizen?",
  //       options: [
  //         { value: undefined, label: "none" },
  //         { value: 1, label: "one" },
  //       ],
  //     },
  //   },
  // ];
  const block = Object.freeze({
    module: "Math",
    wrapper: "AddNumbers",
    wrapper_arguments: {
      avalible_from: ["local", "other_wrapper", "context"],
      arg_schema: {
        a: {
          avalible_from: ["local", "other_wrapper", "context"],
          type: ["primitive", "number"],
        },
        b: {
          avalible_from: ["local", "other_wrapper", "context"],
          type: ["primitive", "text"],
        },
      },
    },
    wrapper_result_schema: ["primitive", "number"],
  } as unknown as WrapperBlock);
</script>

<template>
  <!-- <FormCard name="123" :schema="schema" /> -->
  <!-- <FormCardWrapper
    name="123"
    :schema="formkit_schema"
    :arg_schema="arg_schema"
    :result_schema="result_schema"
  /> -->
  <q-card>
    <q-card-section horizontal>
      <!-- <SelectWrapperBlock /> -->
      <WorkflowTabsRouter />
    </q-card-section>
  </q-card>
</template>
