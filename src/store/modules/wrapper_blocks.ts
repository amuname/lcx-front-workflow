import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import { v4 as uuidv4 } from "uuid";
import { WrapperBlock } from "@/types/wrapper_block.interface";
import {
  getAllModulesKeys,
  getAllModuleFunctionsByModuleTag,
} from "@/http/api";
// import {
//   WrapperBlockArgumentsArgSchema,
//   WrapperBlockArgumentsArgSchemaValue,
// } from "@/types/wrapper_block_arguments.interface";

export const useWrapperBlockStore = defineStore("wrapper_block", () => {
  const block_modules = ref<Record<WrapperBlock["module"], WrapperBlock[]>>({
    StartEnd: [],
  });

  // const block_data = computed(() => Object.values(block_modules.value));

  const block_modules_keys = ref<WrapperBlock["module"][]>([]);
  // const block_modules_keys = computed(() =>
  //   Object.keys(block_modules_mock.value)
  // );

  // async function addkWrapperBlock(block_wrapper: WrapperBlock) {
  //   block_modules.value[block_wrapper["module"]]
  // }
  // const block_modules_mock = computed<
  //   Record<WrapperBlock["module"], WrapperBlock[]>
  // >(() => ({
  //   StartEnd: [
  //     {
  //       module: "StartEnd",
  //       wrapper: "Start",
  //       wrapper_arguments: {
  //         avalible_from: ["local"],
  //         arg_schema: {},
  //       },
  //       wrapper_result_schema: ["primitive", "string"],
  //     },
  //     {
  //       module: "StartEnd",
  //       wrapper: "End",
  //       wrapper_arguments: {
  //         avalible_from: ["local"],
  //         arg_schema: {},
  //       },
  //       wrapper_result_schema: ["primitive", "number"],
  //     },
  //   ] as unknown as WrapperBlock[],
  //   Math: [
  //     {
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
  //     },
  //     {
  //       module: "Math",
  //       wrapper: "AddOne",
  //       wrapper_arguments: {
  //         avalible_from: ["local", "other_wrapper", "context"],
  //         arg_schema: {
  //           a: {
  //             avalible_from: ["local", "other_wrapper", "context"],
  //             type: ["primitive", "number"],
  //           },
  //         },
  //       },
  //       wrapper_result_schema: ["primitive", "number"],
  //     },
  //   ] as unknown as WrapperBlock[],
  //   Response: [
  //     {
  //       module: "Response",
  //       wrapper: "GetHeaders",
  //       wrapper_arguments: {
  //         avalible_from: ["other_wrapper", "context"],
  //         arg_schema: {},
  //       },
  //       wrapper_result_schema: ["Array", "FromStrings"],
  //     },
  //     {
  //       module: "Response",
  //       wrapper: "Body",
  //       wrapper_arguments: {
  //         avalible_from: ["other_wrapper", "context"],
  //         arg_schema: {},
  //       },
  //       wrapper_result_schema: ["Object", "GetByKey"],
  //     },
  //   ] as unknown as WrapperBlock[],
  // }));

  // const block_data_mock = computed(() =>
  //   Object.values(block_modules_mock.value)
  // );

  // const block_modules_keys_mock = computed(() =>
  //   Object.keys(block_modules_mock.value).filter((e) => e !== "StartEnd")
  // );

  async function getApiAllModulesKeys() {
    if (block_modules_keys.value.length) return;
    const res = await getAllModulesKeys();

    block_modules_keys.value = res.data as WrapperBlock["module"][];

    await Promise.all(
      block_modules_keys.value.map((e) =>
        getApiAllModuleFunctionsByModuleTag(e)
      )
    );
  }

  async function getApiAllModuleFunctionsByModuleTag(module_tag: string) {
    if (!block_modules_keys.value.length) return;
    if (block_modules.value[module_tag]?.length) return;
    const res = await getAllModuleFunctionsByModuleTag(module_tag);

    block_modules.value[module_tag] = res.data as WrapperBlock[];
  }

  // async function assignWrapperBlocks(block_wrapper: WrapperBlock[]) {
  //   const arg_block_data = Object.freeze(
  //     block_wrapper.reduce((acc, val) => {
  //       if (acc[val["module"]]) {
  //         acc[val["module"]].push(val);
  //       } else {
  //         acc[val["module"]] = [val];
  //       }
  //       return acc;
  //     }, {} as Record<WrapperBlock["module"], WrapperBlock[]>)
  //   );
  //   block_modules.value = Object.keys(block_modules.value)
  //     .concat(Object.keys(arg_block_data))
  //     .reduce((acc, val) => {
  //       const arg_block_data_val = arg_block_data[val];
  //       const block_modules_val = block_modules.value[val];

  //       acc[val] = arg_block_data_val.concat(block_modules_val);
  //       return acc;
  //     }, {} as Record<WrapperBlock["module"], WrapperBlock[]>);
  // }

  return {
    block_modules,
    // block_modules_mock,
    // block_data_mock,
    // block_data,
    block_modules_keys,
    // block_modules_keys_mock,
    // assignWrapperBlocks,
    getApiAllModulesKeys,
    getApiAllModuleFunctionsByModuleTag,
  };
});
