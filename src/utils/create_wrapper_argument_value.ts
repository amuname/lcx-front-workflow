import { ArgPlacement } from "@/types/arg_placement.type";
import { WrapperArgumentSchemaValue } from "@/types/wrapper_argument_schema_value.type";

export function createLocArgumentWrapperObject(
  object_data: [string, ArgPlacement][]
): WrapperArgumentSchemaValue {
  return Object.fromEntries(object_data.map((e) => [e[0]]));
}
