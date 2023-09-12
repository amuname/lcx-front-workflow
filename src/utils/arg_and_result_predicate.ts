import {
  ArgAndResult,
  PrimitiveArgAndResult,
} from "@/types/arg_and_result.intrface";

export function primitiveOrModuleArgAndResult(
  arg: ArgAndResult
): arg is PrimitiveArgAndResult {
  return (arg as PrimitiveArgAndResult).primitive_value !== undefined;
}
