<script setup lang="ts">
  import { computed, ref, unref } from "vue";
  import { ScriptVersion, TriggerScript } from "@/http/mock";
  import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  import { storeToRefs } from "pinia";
  import { useWebTriggerScriptsStore } from "@/store/modules/web_trigger_scripts";
  import { watch } from "vue";
  import { setEnableOrDisableWebTriggerScript } from "@/http/api";

  const FILTER_FUNCTIONS_MAP = {
    ALL: (_arg: ScriptVersion) => true,
    DRAFT: (arg: ScriptVersion) => arg.status === "DRAFT",
    DRAFT_TESTING: (arg: ScriptVersion) =>
      arg.status === "DRAFT" || arg.status === "TESTING",
    TESTING: (arg: ScriptVersion) => arg.status === "TESTING",
    PROD: (arg: ScriptVersion) => arg.status === "PROD",
  };

  const props = defineProps<{
    scriptTypes: "DRAFT" | "DRAFT_TESTING" | "TESTING" | "PROD" | "ALL";
    scriptSource: "SCRIPT_STORAGE" | "WEB_TRIGGER" | "SCHEDULE_TRIGGER";
  }>();

  const emit = defineEmits(["update:model-value"]);

  function onRowClick(_evt: PointerEvent, row: ScriptVersion, _index: number) {
    console.warn("SCRIPTS TABLE onUpdateModelValue", row);
  }

  const acc_scripts = useAccountScriptsStore();
  const { account_scripts, script_versions } = storeToRefs(acc_scripts);
  const web_trigger_scripts = useWebTriggerScriptsStore();

  const SCRIPT_SOURCE_MAP = {
    SCRIPT_STORAGE: script_versions,
    WEB_TRIGGER: storeToRefs(web_trigger_scripts).script_versions,
    SCHEDULE_TRIGGER: storeToRefs(web_trigger_scripts).script_versions,
  };

  const TABLE_COLUMNS = [
    {
      name: "created_at",
      align: "left",
      label: "created_at",
      field: "created_at",
      sortable: true,
      sort: (a: string, b: string) =>
        new Date(a).valueOf() - new Date(b).valueOf(),
    },
    {
      name: "script_id",
      label: "script_id",
      field: "script_id",
    },
    { name: "version", label: "version", field: "version", sortable: true },
    { name: "status", label: "status", field: "status" },
  ];

  // TO DO изза того что selected один на все таблицы (а не по id скрипта в мапе например),
  // отобрадается всегда галочка в разных табоицах на селект из одной
  const selected = ref<ScriptVersion[]>([]);

  watch(selected, () =>
    unref(selected).length
      ? emit("update:model-value", unref(selected)[0])
      : emit("update:model-value", undefined)
  );

  const scripts_table_data = computed(() => {
    if (props.scriptSource === "SCRIPT_STORAGE") {
      return script_versions.value.size
        ? account_scripts.value.reduce((acc, script) => {
            const script_vers = SCRIPT_SOURCE_MAP[props.scriptSource].value.get(
              script.id
            );
            if (!script_vers) return acc;
            const filtered_script_versions = script_vers.filter(
              FILTER_FUNCTIONS_MAP[props.scriptTypes]
            );
            if (filtered_script_versions.length === 0) return acc;
            else {
              acc[script.id] = filtered_script_versions;
              return acc;
            }
          }, {} as Record<string, ScriptVersion[]>)
        : {};
    } else {
      return SCRIPT_SOURCE_MAP[props.scriptSource].value;
    }
  });
</script>

<template>
  <q-card-section>
    <q-list v-if="scriptSource === 'SCRIPT_STORAGE'" bordered>
      <template v-for="scr of account_scripts" :key="scr.id">
        <q-item v-if="scripts_table_data[scr.id]">
          <q-expansion-item
            group="script_table"
            :label="'Name : ' + scr.name"
            style="width: 100%"
          >
            <q-list>
              <!-- TO DO изза одного и того же selected в v-model:selected багает галочка и показывается на всех таблицах -->
              <q-table
                v-model:selected="selected"
                flat
                :title="scr.name"
                :rows="scripts_table_data[scr.id]"
                :columns="TABLE_COLUMNS"
                row-key="name"
                selection="single"
              />
              <!-- <q-item
                v-for="ver of scripts_table_data[scr.id]"
                :key="ver.version"
              >
                <span>ver_id: {{ ver.version }}</span>
                <span>status: {{ ver.status }}</span>
                <slot> no button</slot>
              </q-item> -->
              <slot
                v-if="selected.length"
                @click="emit('update:model-value', selected[0])"
              >
                no button
              </slot>
            </q-list>
          </q-expansion-item>
        </q-item>
      </template>
    </q-list>
    <q-list v-else bordered>
      <template
        v-for="scr of (scripts_table_data as unknown as TriggerScript[])"
        :key="scr.id"
      >
        <q-item>
          <q-expansion-item
            group="script_table"
            :label="'Name : ' + scr.name"
            style="width: 100%"
          >
            <span> Script id:{{ scr.id }}</span>
            <span> Script name:{{ scr.name }}</span>
            <q-btn
              :label="scr.enable ? 'Enabled' : 'Disabled'"
              @click="
                async () => {
                  const res = await setEnableOrDisableWebTriggerScript(
                    scr.id,
                    !scr.enable
                  );
                  if (res.status === 204) scr.enable = !scr.enable;
                }
              "
            >
            </q-btn>
          </q-expansion-item>
        </q-item>
      </template>
    </q-list>
  </q-card-section>
</template>

<style scoped></style>
