import { ArgType } from "./wrapper_block_arg.type";

export type WrapperArgumentSchemaValue =
  | WrapperArgumentSchemaLocalValue
  | WrapperArgumentSchemaOtherWrapperValue
  | WrapperArgumentSchemaContextValue;

export interface WrapperArgumentSchemaLocalValue {
  placement: "local";
  value: string | boolean;
}

export interface WrapperArgumentSchemaOtherWrapperValue {
  placement: "other_wrapper";
  value: string;
}

export interface WrapperArgumentSchemaContextValue {
  placement: "context";
  value: ArgType;
}
