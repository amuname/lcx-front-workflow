// import { ArgPlacementArray } from "./arg_placement.type";
// import { ArgType } from "./wrapper_block_arg.type";
import { WrapperBlockArguments } from "./wrapper_block_arguments.interface";
import { ResType } from "./wrapper_block_result.type";

export interface WrapperBlock {
  module: string;
  wrapper: string;
  wrapper_arguments: WrapperBlockArguments;
  wrapper_result_schema: ResType;
}

// export type WrapperScriptChain = Record<WrapperBlock["id"], WrapperBlock>;
