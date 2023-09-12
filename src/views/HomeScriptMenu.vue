<script setup lang="ts">
  import AddNewWorkflowTab from "@/components/add_new_workflow_tab/AddNewWorkflowTab.vue";
  import ScriptsTable from "@/components/scripts_table/ScriptsTable.vue";
  import { saveScriptForTesting } from "@/http/api";
  import { ScriptVersion } from "@/http/mock";
  import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  // import { useUserAndAccountStore } from "@/store/modules/user_and_account";
  // import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";
  // import { watch } from "vue";

  // const user_and_account = useUserAndAccountStore();

  const acc_scripts_store = useAccountScriptsStore();

  // const { current_account } = storeToRefs(user_and_account);

  // user_and_account.getUserAccounts();
  // onMounted(() => {
  //   if (!acc_scripts_store.account_scripts.length)
  //     acc_scripts_store.getAccountScripts(current_account.value.accountId);
  // });

  // watch(current_account, (new_val) => {
  //   // new_val
  //   console.log("NEW VALL WATCH ACCOUNT", new_val);

  //   if (new_val) acc_scripts_store.getAccountScripts(new_val.accountId);
  // });

  const selected_script = ref<ScriptVersion | undefined>();

  function onUpdateModelValue(payload: ScriptVersion | undefined) {
    console.log("selected PAYLOAD ", payload);
    selected_script.value = payload;
  }

  async function onSetToStatusTest() {
    const script = selected_script.value as ScriptVersion;
    // TO DO вынести в стор
    const res = await saveScriptForTesting(script.script_id, script.version);
    const version_to_update = (
      acc_scripts_store.script_versions.get(script.script_id) as ScriptVersion[]
    ).find((e) => e.version === res.data.version) as ScriptVersion;

    version_to_update.status = res.data.status;
  }
</script>

<template>
  <q-card>
    <h6>HOME SCRIPT MENU</h6>
    <q-card-section>
      <q-btn :to="{ name: 'HomeView' }" label="to Home"></q-btn>
      <q-btn to="workflow" label="to workflow"></q-btn>

      <AddNewWorkflowTab />
      <!-- <q-btn label="Перейти к скрипту"></q-btn> -->
      <q-btn
        v-if="selected_script"
        label="SET STATUS TEST"
        @click="onSetToStatusTest"
      ></q-btn>
    </q-card-section>

    <ScriptsTable
      script-source="SCRIPT_STORAGE"
      script-types="DRAFT_TESTING"
      @update:model-value="onUpdateModelValue"
    />
  </q-card>
</template>
