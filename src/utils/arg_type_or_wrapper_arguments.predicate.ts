import { ArgType } from "@/types/wrapper_block_arg.type";
import { WrapperBlockArguments } from "@/types/wrapper_block_arguments.interface";

export function predicateArgTypeOrWrapperBlockArguments(
  arg: ArgType | WrapperBlockArguments
): arg is ArgType {
  return (
    Array.isArray(arg as ArgType) &&
    ((arg as ArgType)[0] === "primitive" || (arg as ArgType)[0] === "module")
  );
}
