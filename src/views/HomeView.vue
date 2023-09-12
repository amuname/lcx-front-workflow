<script lang="ts" setup>
  // import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  import { useUserAndAccountStore } from "@/store/modules/user_and_account";

  const user_and_account = useUserAndAccountStore();

  // const acc_scripts_store = useAccountScriptsStore();

  // user_and_account.getUserAccounts();

  // acc_scripts_store.getAccountScripts(
  //   user_and_account.current_account.accountId
  // );
</script>

<template>
  <div>LOW CODE EXECUTOR (конвертер)</div>
  <p>{{ user_and_account.current_account }}</p>
  <q-card-section horizontal>
    <q-list style="width: 10%">
      <q-item to="script_menu">to scripts</q-item>
      <q-item to="testing_menu">to testing</q-item>
      <q-item to="triggers_menu">to triggers</q-item>
      <!-- <q-btn to="script_menu" label="to scripts"></q-btn>
      <q-btn to="testing_menu" label="to testing"></q-btn>
      <q-btn to="triggers_menu" label="to triggers"></q-btn> -->
    </q-list>
    <router-view style="width: 90%"></router-view>
  </q-card-section>
</template>
