<script setup lang="ts">
  // import {
  //   getAccounts,
  //   getAccountScripts,
  //   getScriptVersions,
  // } from "@/http/api";
  // import { Account, Script, ScriptVersion } from "@/http/mock";
  import { onMounted, ref } from "vue";
  // import AddNewWorkflowTab from "@/components/add_new_workflow_tab/AddNewWorkflowTab.vue";
  import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  import { storeToRefs } from "pinia";
  import ChooseTriggerForm from "@/components/choose_trigger_form/ChooseTriggerForm.vue";
  import ScriptsTable from "@/components/scripts_table/ScriptsTable.vue";
  import TriggerFormRouter from "@/components/trigger_form_router/TriggerFormRouter.vue";
  import { ScriptVersion } from "@/http/mock";
  import LocalPlacement from "@/components/placement_forms/LocalPlacement.vue";
  import {
    createScriptProcess,
    saveScriptForProduction,
    saveScriptForTesting,
  } from "@/http/api";
  import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";
  import { unref } from "vue";

  const acc_scripts = useAccountScriptsStore();
  const { account_scripts, script_versions } = storeToRefs(acc_scripts);

  // onMounted(async () => {});

  const script_version = ref<ScriptVersion | undefined>();

  const component_string = ref<"web" | "schedule" | undefined>();

  const arg_data = ref<Record<string, any>>({});

  const check_is_ok = ref<boolean>(false);

  function onUpdateModelValue(payload: "web" | "schedule") {
    component_string.value = payload;
  }

  function onUpdateScriptArgumentModelValue(key: string, payload: any) {
    arg_data.value[key] = payload;
    console.log("onUpdateScriptArgumentModelValue", payload);
  }

  function onSelectedScript(payload: ScriptVersion | undefined) {
    console.warn("onSelectedScript ", payload);
    script_version.value = payload;
  }

  function onCloseTriggerAndScriptForms() {
    component_string.value = undefined;
    script_version.value = undefined;
  }

  async function onSetToStatusProd() {
    const script = script_version.value as ScriptVersion;
    // TO DO вынести в стор
    const res = await saveScriptForProduction(script.script_id, script.version);
    const version_to_update = (
      script_versions.value.get(script.script_id) as ScriptVersion[]
    ).find((e) => e.version === res.data.version) as ScriptVersion;

    version_to_update.status = res.data.status;
  }

  async function onCheckScript() {
    const res = await createScriptProcess(
      unref(script_version) as ScriptVersion,
      unref(arg_data)
    );

    if (res.status === 201) check_is_ok.value = true;
    else check_is_ok.value = false;
  }
</script>

<template>
  <q-card>
    <h6>HOME TESTING MENU</h6>
    <q-card-section>
      <q-btn :to="{ name: 'HomeView' }" label="to Home"></q-btn>
      <!-- <ChooseTriggerForm
        label="CHOOSE TRIGGER ENVIRONMENT"
        @update:model-value="onUpdateModelValue"
      /> -->
      <q-btn
        v-if="script_version && check_is_ok"
        label="SET STATUS prod"
        @click="onSetToStatusProd"
      ></q-btn>
    </q-card-section>
    <q-card-section>
      <!-- <TriggerFormRouter :component_string="component_string" /> -->
    </q-card-section>
    <!-- <q-card-section v-if="script_version && component_string"> -->
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
    <!-- <q-card-section v-if="script_version && component_string"> -->
    <q-card-section v-if="script_version">
      <!-- {{ script_version.arguments_schema }} -->
      <q-btn-group>
        <q-btn
          label="close trigger and script forms"
          @click="onCloseTriggerAndScriptForms"
        ></q-btn>
        <q-btn label="clear script arguments"></q-btn>
        <q-btn label="test trigger" color="blue" @click="onCheckScript"></q-btn>
      </q-btn-group>
    </q-card-section>
    <ScriptsTable
      script-source="SCRIPT_STORAGE"
      script-types="TESTING"
      @update:model-value="onSelectedScript"
    />
  </q-card>
  <!-- <div>{{ pokemonsName }}</div> -->
</template>
