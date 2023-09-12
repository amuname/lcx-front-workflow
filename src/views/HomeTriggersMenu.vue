<script setup lang="ts">
  import { computed, ref } from "vue";
  import ScriptsTable from "@/components/scripts_table/ScriptsTable.vue";
  import ChooseTriggerForm from "@/components/choose_trigger_form/ChooseTriggerForm.vue";
  import TriggerFormRouter from "@/components/trigger_form_router/TriggerFormRouter.vue";
  import LocalPlacement from "@/components/placement_forms/LocalPlacement.vue";
  import { addScript, getAllScripts, setEnableOrDisable } from "@/http/api";
  import { useUserAndAccountStore } from "@/store/modules/user_and_account";
  import { storeToRefs } from "pinia";
  import { ScriptVersion } from "@/http/mock";
  import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  import { useWebTriggerScriptsStore } from "@/store/modules/web_trigger_scripts";

  const web_trigger_store = useWebTriggerScriptsStore();
  // const { getWebTriggerScriptVersions } = storeToRefs(web_trigger_store);

  const acc_scripts = useAccountScriptsStore();
  const { account_scripts } = storeToRefs(acc_scripts);

  const TRIGGER_MAP = {
    web: {
      script_store: account_scripts,
      addScript: addScript,
      getAllScripts: web_trigger_store.getWebTriggerScriptVersions,
      setEnableOrDisable: setEnableOrDisable,
    },
    schedule: {
      script_store: account_scripts,
      addScript: addScript,
      getAllScripts: web_trigger_store.getWebTriggerScriptVersions,
      setEnableOrDisable: setEnableOrDisable,
    },
  };

  const ua_store = useUserAndAccountStore();

  const { current_account } = storeToRefs(ua_store);

  const is_add_trigger_table = ref<"all" | "new">("new");

  const show_script_or_add_new = computed(() =>
    is_add_trigger_table.value === "all" ? "all triggers" : "add new trigger"
  );

  const component_string = ref<"web" | "schedule" | undefined>();

  const script_version = ref<ScriptVersion | undefined>();

  const script_args = ref<Record<string, any>>({});

  const trigger_config = ref<{
    allowedMethods: string;
    requiredHeaders: string;
    waitForScriptEnd: boolean;
  }>({
    allowedMethods: "",
    requiredHeaders: "",
    waitForScriptEnd: false,
  });

  async function onUpdateModelValue(payload: "web" | "schedule") {
    await TRIGGER_MAP[payload].getAllScripts(
      current_account.value?.accountId as string
    );

    component_string.value = payload;
  }

  async function onAddNewTrigger() {
    // if (!component_string.value) return;

    const script_data = account_scripts.value.find(
      (e) => e.id === script_version.value?.script_id
    );
    const res = await TRIGGER_MAP[
      component_string.value as "web" | "schedule"
    ].addScript(
      current_account.value?.accountId as string,
      script_data?.name as string,
      script_data?.description as string,
      (script_version.value as ScriptVersion).version as number,
      script_args.value,
      (script_version.value as ScriptVersion).script_schema,
      (script_version.value as ScriptVersion).script_id,
      trigger_config.value
    );

    if (res.status === 201)
      // setTriggerScripsData(
      //   (
      await TRIGGER_MAP[
        component_string.value as "web" | "schedule"
      ].getAllScripts(current_account.value?.accountId as string);
    // ).data
    // );
  }

  function setTriggerScripsData(scripts_data: any[]) {
    TRIGGER_MAP[
      component_string.value as "web" | "schedule"
    ].script_store.value = scripts_data;
  }

  function onSelectedScript(payload: ScriptVersion | undefined) {
    console.warn("onSelectedScript ", payload);
    script_version.value = payload;
  }

  function onTriggerConfigData(payload: any) {
    trigger_config.value = payload;
  }

  function onUpdateScriptArgumentModelValue(key: string, payload: any) {
    script_args.value[key] = payload;
  }
</script>

<template>
  <q-card>
    <h6>HOME triggers MENU</h6>
    <q-card-section>
      <q-btn :to="{ name: 'HomeView' }" label="to Home"></q-btn>
      <ChooseTriggerForm
        label="CHOOSE TRIGGER ENVIRONMENT"
        @update:model-value="onUpdateModelValue"
      />
    </q-card-section>
    <q-card-section>
      <TriggerFormRouter
        :component_string="component_string"
        @update:model-value="onTriggerConfigData"
      />
    </q-card-section>
    {{ show_script_or_add_new }}
    <q-card-section>
      <q-btn-group>
        <q-btn
          label="set to new"
          :disable="is_add_trigger_table === 'new'"
          @click="is_add_trigger_table = 'new'"
        ></q-btn>
        <q-btn
          label="trigger scripts"
          :disable="is_add_trigger_table !== 'new'"
          @click="is_add_trigger_table = 'all'"
        ></q-btn>
      </q-btn-group>
    </q-card-section>
    <q-card-section v-if="script_version">
      <LocalPlacement
        v-for="arg of Object.entries(
          (JSON.parse(script_version.arguments_schema) as Record<string, {
          placement: 'local'; value: ['primitive', 'number'] }>) )"
        :key="arg[0]"
        :form-type="arg[1].value[1]"
        :data-type="arg[1].placement"
        @update:model-value="
          ($event) => onUpdateScriptArgumentModelValue(arg[0], $event)
        "
      />
    </q-card-section>
    <template v-if="is_add_trigger_table === 'all'">
      <ScriptsTable
        script-source="WEB_TRIGGER"
        script-types="ALL"
        @update:model-value="onSelectedScript"
      >
        <q-btn label="SHOW_TRIGGER_SCRIPT"></q-btn>
      </ScriptsTable>
    </template>
    <template v-else>
      <ScriptsTable
        script-source="SCRIPT_STORAGE"
        script-types="PROD"
        @update:model-value="onSelectedScript"
      >
        <q-btn
          v-if="script_version"
          label="ADD_NEW_TRIGGER"
          @click="onAddNewTrigger"
        ></q-btn>
      </ScriptsTable>
    </template>
  </q-card>
</template>
