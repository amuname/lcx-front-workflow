import { ResType } from "./wrapper_block_result.type";

export interface WrapperBlockSchema {
  id: string;
  module: string;
  wrapper: string;
  wrapper_arguments: object;
  wrapper_result_schema: ResType;
  prev_id: string;
  next: string;
}
