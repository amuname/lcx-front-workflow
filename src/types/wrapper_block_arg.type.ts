export type ArgType = ModuleArg | PrimitiveArg;

export type PrimitiveArg = ["primitive", string];

export type ModuleArg = ["module", string, "wrapper", string];
