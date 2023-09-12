export type ArgAndResult = ModuleArgAndResult | PrimitiveArgAndResult;

export interface PrimitiveArgAndResult {
  name: string;
  id: string;
  primitive_value: string;
}

export interface ModuleArgAndResult {
  name: string;
  id: string;
  module: string;
  function: string;
}
