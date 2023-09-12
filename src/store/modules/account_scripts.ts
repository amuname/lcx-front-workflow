import { Script, ScriptVersion } from "@/http/mock";
import {
  getScriptsByAccountId as getAccScripts,
  getScriptVersionsById as getScrptVersions,
} from "@/http/api";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAccountScriptsStore = defineStore("account_scripts", () => {
  const account_scripts = ref<Omit<Script, "versions">[]>([]);

  const script_versions = ref(new Map<string, ScriptVersion[]>());

  // const testing_scripts = computed(()=> [...script_versions.value.values()].filter(e=> e))

  async function getAccountScripts(
    account_id: string,
    offset: 10 | 20 | 50 | 100 = 10,
    limit: 10 | 20 | 50 | 100 = 10
  ) {
    const res = (await getAccScripts(account_id)).data as unknown as Omit<
      Script,
      "versions"
    >[];
    console.warn(res);
    if (!res) return;
    account_scripts.value = res;
    account_scripts.value.forEach((e) => getScriptVersions(e.id));
  }

  async function getScriptVersions(script_id: string) {
    const res = (await getScrptVersions(script_id)).data;
    if (!res) return;
    script_versions.value.set(script_id, res);
  }

  function $reset() {
    account_scripts.value = [];
    script_versions.value = new Map<string, ScriptVersion[]>();
  }
  return {
    account_scripts,
    script_versions,
    getAccountScripts,
    getScriptVersions,
    $reset,
  };
});
