import {
  ArgPlacementArray,
  ArgPlacementArrayWithMixed,
  // ArgPlacementArray,
} from "./arg_placement.type";
import { ArgType } from "./wrapper_block_arg.type";

export interface WrapperBlockArguments {
  avalible_from: ArgPlacementArrayWithMixed;
  arg_schema: WrapperBlockArgumentsArgSchema;
}

export interface WrapperBlockArgumentsArgSchema {
  [x: string]: WrapperBlockArgumentsArgSchemaValue;
}

export interface WrapperBlockArgumentsArgSchemaValue {
  avalible_from: ArgPlacementArray;
  type: ArgType;
}
