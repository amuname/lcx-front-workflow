<script setup lang="ts">
  import { ref, unref } from "vue";

  const emit = defineEmits(["update:model-value"]);

  const method_get = ref(false);
  const method_head = ref(false);
  const method_post = ref(false);
  const method_put = ref(false);
  const method_delete = ref(false);
  const method_connect = ref(false);
  const method_options = ref(false);
  const method_trace = ref(false);
  const method_patch = ref(false);
  // };

  const required_headers = ref<string>("");
  const wait_for_script_end = ref<boolean>(false);

  // const arg_values = ref(pre_values);

  function onUpdateModelValue() {
    emit("update:model-value", {
      methods: Object.entries({
        get: unref(method_get),
        head: unref(method_head),
        post: unref(method_post),
        put: unref(method_put),
        delete: unref(method_delete),
        connect: unref(method_connect),
        options: unref(method_options),
        trace: unref(method_trace),
        patch: unref(method_patch),
      }).reduce((acc, val) => {
        if (val[1]) acc.push(val[0].toUpperCase());
        return acc;
      }, [] as string[]),
      required_headers: unref(required_headers) || [],
      wait_for_script_end: unref(wait_for_script_end),
    });
  }
</script>

<template>
  <!-- <h6>WebTriggerForm</h6> -->
  <div>WebTriggerFormg</div>
  <!-- textarea надо преобразовывать значение 'key:val; key1:val1;' в ['key:val', 'key1:val1'] -->
  <!-- <div v-for="[name, val] of Object.entries(allowed_methods)" :key="name"> -->
  <q-checkbox
    v-model="method_get"
    label="GET"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_head"
    label="HEAD"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_post"
    label="POST"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_put"
    label="PUT"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_delete"
    label="DELETE"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_connect"
    label="CONNECT"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_options"
    label="OPTIONS"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_trace"
    label="TRACE"
    @update:model-value="onUpdateModelValue"
  />
  <q-checkbox
    v-model="method_patch"
    label="PATCH"
    @update:model-value="onUpdateModelValue"
  />
  <!-- </div> -->
  <q-input
    v-model="required_headers"
    :debounce="500"
    filled
    label="requiredHeaders"
    type="textarea"
    @update:model-value="($event) => {
      required_headers = ($event as string).replaceAll('\n', '').replaceAll(';', ';\n');
      onUpdateModelValue();
      }"
  />
  <q-toggle
    v-model="wait_for_script_end"
    label="waitForScriptEnd"
    @update:model-value="onUpdateModelValue"
  />
</template>

<style scoped></style>
