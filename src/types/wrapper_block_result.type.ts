export type ResType = ModuleRes | PrimitiveRes;

export type PrimitiveRes = ["primitive", string];

export type ModuleRes = ["module", string, "wrapper", string];
