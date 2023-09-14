import { defineStore } from "pinia";
import { Ref, computed, ref, unref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { WrapperBlockSchema } from "@/types/wrapper_block.type";

const defaultScript = (): WrapperBlockSchema[] => [
  {
    id: "start",
    prev_id: "",
    module: "StartEnd",
    wrapper: "Start",
    wrapper_arguments: {},
    wrapper_result_schema: {},
    next: [
      {
        id: "end",
      },
    ],
  },
  {
    id: "end",
    prev_id: "start",
    module: "StartEnd",
    wrapper: "End",
    wrapper_arguments: {},
    wrapper_result_schema: {},
    next: [],
  },
];

// class WorkflowTab implements WorkflowTabInterface {
//   public id: string;
//   public active: boolean;
//   public script: Record<string, WrapperBlockSchema>;
//   constructor(script?: Record<string, WrapperBlockSchema>, active?: boolean) {
//     this.id = uuidv4();
//     this.script = script ? script : defaultScript();
//     this.active = active || false;
//   }
// }

class Wrapper implements WrapperBlockSchema {
  public id: string;
  public module: string;
  public wrapper: string;
  public wrapper_arguments: object;
  public wrapper_result_schema: any;
  public prev_id: string;
  public next: [{ id: string }] | never[];

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
    this.next = [{ id: next_id }];
    // this.next.push({ id: next_id });
  }
}

export const useWorkflowStore = defineStore("one_tab_workflow", () => {
  const script = ref<WrapperBlockSchema[]>(defaultScript());

  const c_script = computed(() => script);

  function findScriptWrapper(block_id: string) {
    return script.value.find((e) => e.id === block_id) as WrapperBlockSchema;
  }

  function insertWrapperBlock(
    module_name: string,
    wrapper_name: string,
    wrapper_result_schema: any
  ) {
    console.error("STORE insertWrapperBlock");
    // const tab_script = work_tabs.value[tab_id].script;
    const end_block = findScriptWrapper("end");
    const start_block = findScriptWrapper("start");
    const prev_id = end_block.prev_id;
    // wrapper.prev_id = prev_id;
    // wrapper.next[0].id = "end";
    const wrapper = new Wrapper(
      module_name,
      wrapper_name,
      wrapper_result_schema,
      prev_id,
      "end"
    );

    start_block.next[0].id = wrapper.id;
    end_block.prev_id = wrapper.id;

    script.value.push(wrapper);
  }

  function removeWrapperBlock(wrapper: WrapperBlockSchema) {
    // const tab_script = unref(script);
    const wrapper_id = wrapper.id;
    const prev_id = wrapper.prev_id;
    const next_id = wrapper.next[0].id;

    findScriptWrapper(prev_id).next[0].id = next_id;
    findScriptWrapper(next_id).prev_id = prev_id;
    // delete findScriptWrapper(wrapper_id);

    const index = script.value.findIndex((e) => e.id === wrapper_id);
    script.value.splice(index, 1);
  }

  function moveWrapperBlock(
    direction: "up" | "down",
    wrapper: WrapperBlockSchema
  ) {
    // const tab_script = unref(script);
    const prev_id = wrapper.prev_id;
    const next_id = wrapper.next[0].id;
    if (direction === "up") {
      const prev_script = findScriptWrapper(prev_id);
      prev_script.next[0].id = next_id;
      findScriptWrapper(next_id).prev_id = prev_id;
      wrapper.prev_id = prev_script.prev_id;
      wrapper.next[0].id = prev_id;
    } else {
      const next_script = findScriptWrapper(next_id);
      next_script.next[0].id = next_id;
      findScriptWrapper(prev_id).prev_id = prev_id;
      wrapper.prev_id = next_script.prev_id;
      wrapper.next[0].id = next_id;
    }
  }

  return {
    c_script,
    findScriptWrapper,
    insertWrapperBlock,
    removeWrapperBlock,
    moveWrapperBlock,
  };
});
