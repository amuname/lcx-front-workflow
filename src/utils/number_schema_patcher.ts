import { BlitzSchema, PatchedBlitzSchema } from "@/types/schema.interface";

export function numberSchemaPatcher(schema: BlitzSchema): PatchedBlitzSchema {
  (schema as PatchedBlitzSchema).parseInput = (val) => Number(val);

  return schema as PatchedBlitzSchema;
}
