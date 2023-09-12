import { ResType, PrimitiveRes } from "@/types/wrapper_block_result.type";

export function predicatePrimitiveRes(arg: ResType): arg is PrimitiveRes {
  return (arg as PrimitiveRes)[0] === "primitive";
}
