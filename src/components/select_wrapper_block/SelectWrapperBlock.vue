<script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { useWrapperBlockStore } from "@/store/modules/wrapper_blocks";
  import { WrapperBlock } from "@/types/wrapper_block.interface";
  import { computed } from "vue";

  const FIND_MODULE_LABEL = "Поиск модулей";
  const FIND_WRAPPER_LABEL = "Поиск функций";

  const blocks = useWrapperBlockStore();
  const {
    block_modules,
    // block_data_mock,
    block_modules_keys,
  } = storeToRefs(blocks);

  // const props = defineProps<{ active_block: WrapperBlock }>();

  // const emit = defineEmits<{
  //   // change: [id: number]; // named tuple syntax
  //   "update:model-value": [value: any];
  // }>();

  const emit = defineEmits(["update:model-value"]);

  const module_options = ref();

  const module_form_value = ref("");

  const choosen_module = ref("");
  const choosen_module_bool = computed<boolean>(() => {
    // console.error("Boolean(choosen_module.value)", !choosen_module.value);
    return !choosen_module.value;
  });

  function moduleFilterFn(val: string, update: any) {
    if (val === "") {
      const fn = () => (module_options.value = block_modules_keys.value);
      update(fn);
      return;
    }

    const fn = () => {
      const needle = val.toLowerCase();
      module_options.value = block_modules_keys.value.filter(
        (v: string) => v.toLowerCase().indexOf(needle) > -1
      );
    };
    update(fn);
  }

  function moduleUpdateModelValue(payload: string) {
    blocks.getApiAllModuleFunctionsByModuleTag(payload);
    choosen_module.value = payload;
    console.log("SEARCH MODULE => ", payload);
  }

  const wrapper_options = ref();

  const wrapper_form_value = ref("");

  function wrapperFilterFn(val: string, update: any) {
    if (val === "") {
      if (choosen_module_bool.value) return;
      const fn = () =>
        (wrapper_options.value = block_modules.value[choosen_module.value].map(
          (e) => ({
            label: e.wrapper,
            value: e,
          })
        ));
      update(fn);
      return;
    }

    const fn = () => {
      if (choosen_module_bool.value) return;
      const needle = val.toLowerCase();
      console.log();
      wrapper_options.value = block_modules.value[choosen_module.value]
        .filter((v) => v.wrapper.toLowerCase().indexOf(needle) > -1)
        .map((e) => ({ label: e.wrapper, value: e }));
    };
    update(fn);
  }

  function wrapperUpdateModelValue(payload: {
    label: string;
    value: WrapperBlock;
  }) {
    console.log("SEARCH WRAPPER => ", payload);
    emit("update:model-value", payload.value);
  }
</script>

<template>
  <!-- <q-card-section horizontal> -->
  <q-card-section>
    <q-select
      v-model="module_form_value"
      filled
      :error-message="'error'"
      use-input
      input-debounce="0"
      :label="FIND_MODULE_LABEL"
      :options="module_options"
      @filter="moduleFilterFn"
      @update:model-value="moduleUpdateModelValue"
    >
      <template #after>
        <slot></slot>
      </template>
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-select
      v-model="wrapper_form_value"
      filled
      :error-message="'error'"
      use-input
      input-debounce="0"
      :loading="Boolean(block_modules[choosen_module])"
      :disable="choosen_module_bool"
      :label="FIND_WRAPPER_LABEL"
      :options="wrapper_options"
      @filter="wrapperFilterFn"
      @update:model-value="wrapperUpdateModelValue"
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
