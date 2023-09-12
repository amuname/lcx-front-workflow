import { ArgType, PrimitiveArg } from "@/types/wrapper_block_arg.type";

export function predicatePrimitiveArg(arg: ArgType): arg is PrimitiveArg {
  return (arg as PrimitiveArg)[0] === "primitive";
}
