import { WrapperBlockSchema } from "./wrapper_block.type";

export interface WorkflowTabInterface {
  id: string;
  active: boolean;
  script: Record<string, WrapperBlockSchema>;
}
