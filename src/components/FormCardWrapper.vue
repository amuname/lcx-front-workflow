<script setup lang="ts">
  import { primitiveOrModuleArgAndResult } from "@/utils/arg_and_result_predicate";
  import { predicatePrimitiveArg } from "@/utils/arg_type.predicate";
  import { computed } from "vue";
  import { ref } from "vue";
  // import { FormKitSchema, FormKit } from "@formkit/vue";

  const props = defineProps<{
    name: string;
    schema: any[];
    arg_schema: Record<string, any>;
    result_schema: Record<string, any>;
  }>();
  const emit = defineEmits<{
    change: [id: number];
    update: [value: string];
  }>();

  primitiveOrModuleArgAndResult;
  predicatePrimitiveArg;

  const store_data_schema_object_values = [
    {
      id: "start",
      prev_id: "",
      module: "StartEnd",
      wrapper: "Start",
      wrapper_arguments: {},
      wrapper_result_schema: {},
      next: [
        {
          id: "block1",
        },
      ],
    },
    {
      id: "block1",
      prev_id: "start",
      module: "Math",
      wrapper: "AddNumbers",
      wrapper_arguments: {
        arg_schema: {
          a: {
            avalible_from: ["local", "other_wrapper", "context"],
            type: ["primitive", "number"],
          },
          b: {
            avalible_from: ["local", "other_wrapper", "context"],
            type: ["primitive", "number"],
          },
        },
        wrapper_result_schema: ["primitive", "number"],
        next: [
          {
            id: "end",
          },
        ],
      },
    },
    {
      id: "end",
      prev_id: "block1",
      module: "StartEnd",
      wrapper: "End",
      wrapper_arguments: {},
      wrapper_result_schema: {},
      next: [],
    },
  ];

  const avlible_procs = computed(() => {
    return store_data_schema_object_values.filter((obj) => {
      if (predicatePrimitiveArg(obj)) {
        return true;
      }
      return true;
    });
  });

  // props.schema.forEach;

  // const schema1 = [
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
  //       name: "select",
  //       type: "select",
  //       id: "eu",
  //       // value: false,
  //       label: "Are you a european citizen?",
  //       options: [{ value: 1, label: "one" }],
  //     },
  //   },
  // ];

  const data = ref({ value: 5 });

  function register(payload: any) {
    console.log(typeof payload, payload);
  }
</script>

<template>
  <q-card>
    <q-card-section>{Function - name} arguments card</q-card-section>
    <q-card-section class="base-form">
      <FormKit
        v-model="data"
        type="form"
        @submit="register"
        @update:model-value="register"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <!-- <FormKit type="email" /> -->
      <p>{{ data }}</p>
    </q-card-section>
  </q-card>
</template>

<style scoped>
  .base-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
</style>
@/utils/arg_type.predicate
