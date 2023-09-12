import { Script, ScriptVersion, TriggerScript } from "@/http/mock";
import {
  // getWebTriggerScriptVersions as getAccScripts,
  getAllScripts as getScrptVersions,
} from "@/http/api";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWebTriggerScriptsStore = defineStore(
  "web_trigger_scripts",
  () => {
    // const web_trigger_scripts = ref<Omit<Script, "versions">[]>([]);

    const script_versions = ref<TriggerScript[]>([]);

    // const testing_scripts = computed(()=> [...script_versions.value.values()].filter(e=> e))

    // async function getWebTriggerScripts(
    //   account_id: string,
    //   limit: 10 | 20 | 50 | 100 = 10
    // ) {
    //   const res = (await getAccScripts(account_id, limit)) as Omit<
    //     Script,
    //     "versions"
    //   >[];
    //   if (!res) return;
    //   web_trigger_scripts.value = res;
    //   web_trigger_scripts.value.forEach((e) =>
    //     getWebTriggerScriptVersions(e.id)
    //   );
    // }

    async function getWebTriggerScriptVersions(account_id: string) {
      const res = await getScrptVersions(account_id);
      if (res.status !== 200) return;
      script_versions.value = res.data;
    }
    return {
      // web_trigger_scripts,
      script_versions,
      // getWebTriggerScripts,
      getWebTriggerScriptVersions,
    };
  }
);
