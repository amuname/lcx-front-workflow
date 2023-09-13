import { defineStore } from "pinia";
import { computed, ref, unref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { WrapperBlockSchema } from "@/types/wrapper_block.type";
import { WorkflowTabInterface } from "@/types/workflow_tab.type";

const defaultScript = (): Record<string, WrapperBlockSchema> => ({
  start: {
    id: "start",
    prev_id: "",
    module: "StartEnd",
    wrapper: "Start",
    wrapper_arguments: {},
    wrapper_result_schema: [],
    next_id: "",
  },
  end: {
    id: "end",
    prev_id: "start",
    module: "StartEnd",
    wrapper: "End",
    wrapper_arguments: {},
    wrapper_result_schema: [],
    next_id: "",
  },
});

class WorkflowTab implements WorkflowTabInterface {
  public id: string;
  public active: boolean;
  public script: Record<string, WrapperBlockSchema>;
  public script_id: string;
  public name: string;
  public description: string;
  public version: number;
  constructor(
    script?: Record<string, WrapperBlockSchema>,
    active?: boolean,
    version?: number,
    script_id?: string
  ) {
    this.id = uuidv4();
    this.script = script ? script : defaultScript();
    this.active = active || false;
    this.name = "Default name";
    this.description = "Default description";
    this.version = version || 1;
    this.script_id = script_id || "";
  }
}

class Wrapper implements WrapperBlockSchema {
  public id: string;
  public module: string;
  public wrapper: string;
  public wrapper_arguments: object;
  public wrapper_result_schema: any;
  public prev_id: string;
  public next: string;

  constructor(
    wrapper_module: string,
    wrapper: string,
    wrapper_result_schema: any,
    prev_id: string,
    next_id: string
  ) {
    this.id = uuidv4();
    this.module = wrapper_module;
    this.wrapper = wrapper;
    this.wrapper_arguments = {};
    this.wrapper_result_schema = wrapper_result_schema;
    this.prev_id = prev_id;
    this.next = next_id;
    // this.next.push({ id: next_id });
  }
}

export const useWorkflowStore = defineStore("workflow", () => {
  const work_tabs = ref<Record<string, WorkflowTab>>({});

  const current_tab_id = ref("");

  const current_tab = computed<WorkflowTab>(() => {
    return work_tabs.value[current_tab_id.value];
    // return {
    //   id: uuidv4(),
    //   script: {
    //     start: {
    //       id: "start",
    //       prev_id: "",
    //       module: "StartEnd",
    //       wrapper: "Start",
    //       wrapper_arguments: {},
    //       wrapper_result_schema: {},
    //       next: [
    //         {
    //           id: "block1",
    //         },
    //       ],
    //     },
    //     block1: {
    //       id: "block1",
    //       prev_id: "start",
    //       module: "Math",
    //       wrapper: "AddNumbers",
    //       wrapper_arguments: {
    //         avalible_from: ["local", "other_wrapper", "context"],
    //         arg_schema: {
    //           a: {
    //             avalible_from: ["local", "other_wrapper", "context"],
    //             type: ["primitive", "number"],
    //           },
    //           b: {
    //             avalible_from: ["local", "other_wrapper", "context"],
    //             type: ["primitive", "number"],
    //           },
    //         },
    //       },
    //       wrapper_result_schema: ["primitive", "number"],
    //       next: [
    //         {
    //           id: "end",
    //         },
    //       ],
    //     },
    //     end: {
    //       id: "end",
    //       prev_id: "block1",
    //       module: "StartEnd",
    //       wrapper: "End",
    //       wrapper_arguments: {},
    //       wrapper_result_schema: {},
    //       next: [],
    //     },
    //   },
    // };
  });

  // const current_tab_script = computed(() => current_tab.value.script);

  async function setActiveTab(tab_id: string) {
    unref(work_tabs)[tab_id].active = true;
    current_tab_id.value = tab_id;
  }

  function createTab(tab_data?: Record<string, WrapperBlockSchema>) {
    const tab = new WorkflowTab(tab_data);
    work_tabs.value[tab.id] = tab;
    setActiveTab(tab.id);
  }

  function insertWrapperBlock(
    tab_id: string,
    module_name: string,
    wrapper_name: string,
    wrapper_result_schema: any
  ) {
    console.error("STORE insertWrapperBlock");
    // const tab_script = work_tabs.value[tab_id].script;
    const end_block = unref(work_tabs)[tab_id].script["end"];
    const prev_id = end_block.prev_id;
    const start_block = unref(work_tabs)[tab_id].script[prev_id];
    // wrapper.prev_id = prev_id;
    // wrapper.next[0].id = "end";
    const wrapper = new Wrapper(
      module_name,
      wrapper_name,
      wrapper_result_schema,
      prev_id,
      "end"
    );

    unref(work_tabs)[tab_id].script[wrapper.id] = wrapper;

    start_block.next = wrapper.id;
    end_block.prev_id = wrapper.id;
    return wrapper;
  }

  function removeWrapperBlock(tab_id: string, wrapper: WrapperBlockSchema) {
    const tab_script = unref(work_tabs)[tab_id].script;
    const wrapper_id = wrapper.id;
    const prev_id = wrapper.prev_id;
    const next_id = wrapper.next;

    tab_script[prev_id].next = next_id;
    tab_script.next_id.prev_id = prev_id;
    delete tab_script[wrapper_id];
  }

  function setTabWrapperPevId(
    tab_id: WorkflowTab["id"],
    cur_id: WrapperBlockSchema["id"],
    prev_id: WrapperBlockSchema["id"]
  ) {
    const tab_script = unref(work_tabs)[tab_id].script;
    const cur_wrapper = tab_script[cur_id];
    cur_wrapper.prev_id = prev_id;
  }

  function setTabWrapperNextId(
    tab_id: WorkflowTab["id"],
    cur_id: WrapperBlockSchema["id"],
    next_id: WrapperBlockSchema["id"]
  ) {
    const tab_script = unref(work_tabs)[tab_id].script;
    const cur_wrapper = tab_script[cur_id];
    cur_wrapper.next = next_id;
  }

  function moveWrapperBlock(
    tab_id: WorkflowTab["id"],
    direction: "up" | "down",
    wrapper: WrapperBlockSchema
  ) {
    const tab_script = unref(work_tabs)[tab_id].script;
    const prev_id = wrapper.prev_id;
    const next_id = wrapper.next[0];
    if (direction === "up") {
      const prev_prev_id = tab_script[prev_id].prev_id;
      setTabWrapperPevId(tab_id, wrapper.id, prev_prev_id);
      setTabWrapperPevId(tab_id, prev_id, wrapper.id);
      setTabWrapperPevId(tab_id, next_id, prev_id);
      setTabWrapperNextId(tab_id, wrapper.id, prev_id);
      setTabWrapperNextId(tab_id, prev_id, next_id);
      setTabWrapperNextId(tab_id, prev_prev_id, wrapper.id);
    } else if (direction === "down") {
      const next_next_id = tab_script[next_id].next[0];
      setTabWrapperPevId(tab_id, wrapper.id, next_id);
      setTabWrapperPevId(tab_id, next_id, prev_id);
      setTabWrapperPevId(tab_id, next_next_id, wrapper.id);
      setTabWrapperNextId(tab_id, wrapper.id, next_next_id);
      setTabWrapperNextId(tab_id, next_id, wrapper.id);
      setTabWrapperNextId(tab_id, prev_id, next_id);
    }
  }

  function updateWrapperBlockArguments(
    tab_id: WorkflowTab["id"],
    block_id: WrapperBlockSchema["id"],
    arg_obj: WrapperBlockSchema["wrapper_arguments"]
  ) {
    const tab_script = unref(work_tabs)[tab_id].script;
    tab_script[block_id].wrapper_arguments = arg_obj;
  }

  function updateScriptId(
    tab_id: WorkflowTab["id"],
    script_id: WorkflowTab["script_id"]
  ) {
    unref(work_tabs)[tab_id].script_id = script_id;
  }

  return {
    work_tabs,
    current_tab,
    setActiveTab,
    createTab,
    insertWrapperBlock,
    removeWrapperBlock,
    moveWrapperBlock,
    updateWrapperBlockArguments,
    updateScriptId,
  };
});
