import { BlitzSchema, PatchedBlitzSchema } from "@/types/schema.interface";
import { numberSchemaPatcher } from "./number_schema_patcher";

export function patchSchemaRecursive(schemas: BlitzSchema[]) {
  schemas.forEach((schema) => {
    switch (schema.type) {
      case "number":
        if (schema.schema) patchSchemaRecursive(schema.schema);
        return numberSchemaPatcher(schema);
      // case "text":
      case "password":
      case "textarea":
      case "email":
      case "search":
      case "tel":
      case "file":
      case "url":
      case "timedate":
    }
  });
}
