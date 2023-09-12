<script setup lang="ts">
  import { onMounted, nextTick } from "vue";
  import { useUserAndAccountStore } from "@/store/modules/user_and_account";
  import { useAccountScriptsStore } from "@/store/modules/account_scripts";
  import { storeToRefs } from "pinia";
  const ua_store = useUserAndAccountStore();
  const acc_scripts_store = useAccountScriptsStore();

  const { current_account } = storeToRefs(ua_store);

  onMounted(async () => {
    await ua_store.logInUser({
      email: "test1@test.test",
      password: "543215",
    });

    nextTick(async () => {
      acc_scripts_store.getAccountScripts(
        (
          current_account.value as {
            userId: string;
            accountId: string;
            assignedAt: string;
            assigneeId: string;
            active: boolean;
          }
        ).accountId
      );
    });
  });
</script>

<template>
  <q-card>
    <!-- <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
  </div>-->
    <!-- <img alt="Vue logo" src="@/assets/images/logo.png" width="120" /> -->
    <!-- <button @click="() => workflow.createTab()">create tab</button>
    APP -->

    <router-view />
  </q-card>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    // margin-top: 60px;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
