import axios, { AxiosInstance } from "axios";
import {
  Account,
  OnlyScriptVersions,
  Script,
  ScriptImpl0Account,
  ScriptVersion,
  ScriptsData,
} from "./mock";

import { UserAndAccountInfo } from "@/store/modules/user_and_account";

export const api: AxiosInstance = axios.create({
  baseURL: "http://lcx.ru",
});

export async function getAuthToken() {
  return "Bearer " + localStorage.getItem("access_token");
}

export function logIn(data: { email: string; password: string }) {
  // if (import.meta.env.DEV)
  //   return Promise.resolve({
  //     data: {
  //       access_token:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QudGVzdCIsInN1YiI6IjMxM2RhNDA1LTNjMzktNDlhZC04OTc3LTBkOGU1Y2IyNjYwZCIsImlhdCI6MTY5MzY1NjcxMiwiZXhwIjoxNjkzNjYwMzEyfQ.SrZ5D9zRWt8UNfKnig9lf2amvGmesaFVi1LChwR6m3I",
  //     },
  //   });

  return api.post("/auth/login", data);
}

export async function getUserAccounts() {
  // if (import.meta.env.DEV)
  //   return {
  //     data: [
  //       {
  //         userId: "313da405-3c39-49ad-8977-0d8e5cb2660d",
  //         accountId: "2f34b761-2610-497a-9552-f098dc34f453",
  //         assignedAt: "2023-06-18T22:18:31.112Z",
  //         assigneeId: "313da405-3c39-49ad-8977-0d8e5cb2660d",
  //         active: true,
  //       },
  //     ],
  //   };

  return api.get<UserAndAccountInfo[]>("/users/accounts", {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptById(script_id: string) {
  return api.get("/storage/getScriptById/" + script_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptByIdAndVersion(script_id: string) {
  return api.get("/storage/getScriptByIdAndVersion/" + script_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptsByAccountId(account_id: string) {
  // if (import.meta.env.DEV)
  //   return {
  //     data: [
  //       {
  //         id: "a268f94b-98be-42cd-bbad-35aee936c57a",
  //         name: "Default name",
  //         description: "Default description",
  //         creator_id: "313da405-3c39-49ad-8977-0d8e5cb2660d",
  //         account_id: "2f34b761-2610-497a-9552-f098dc34f453",
  //       },
  //       {
  //         id: "a39c8547-3faa-4dac-90e1-b404a27d39f6",
  //         name: "Default name",
  //         description: "Default description",
  //         creator_id: "313da405-3c39-49ad-8977-0d8e5cb2660d",
  //         account_id: "2f34b761-2610-497a-9552-f098dc34f453",
  //       },
  //       {
  //         id: "e45ad443-3e35-4c9a-8c2f-e8b4c30d0e78",
  //         name: "arg schema",
  //         description: "Default description",
  //         creator_id: "313da405-3c39-49ad-8977-0d8e5cb2660d",
  //         account_id: "2f34b761-2610-497a-9552-f098dc34f453",
  //       },
  //     ],
  //   };

  return api.get("/storage/getScriptsByAccountId/" + account_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptVersionsById(script_id: string) {
  // if (import.meta.env.DEV) {
  //   const script_map = {
  //     "a268f94b-98be-42cd-bbad-35aee936c57a": [
  //       {
  //         created_at: "2023-09-02T18:05:22.624Z",
  //         script_id: "a268f94b-98be-42cd-bbad-35aee936c57a",
  //         version: 1,
  //         status: "TESTING",
  //         arguments_schema: "{}",
  //         script_schema:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         script_schema_raw:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         result_schema: '["primitive","number"]',
  //       },
  //     ],
  //     "a39c8547-3faa-4dac-90e1-b404a27d39f6": [
  //       {
  //         created_at: "2023-09-02T18:09:38.592Z",
  //         script_id: "a39c8547-3faa-4dac-90e1-b404a27d39f6",
  //         version: 1,
  //         status: "DRAFT",
  //         arguments_schema: "{}",
  //         script_schema:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         script_schema_raw:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         result_schema: '["primitive","number"]',
  //       },
  //     ],
  //     "e45ad443-3e35-4c9a-8c2f-e8b4c30d0e78": [
  //       {
  //         created_at: "2023-09-03T12:21:41.539Z",
  //         script_id: "e45ad443-3e35-4c9a-8c2f-e8b4c30d0e78",
  //         version: 1,
  //         status: "TESTING",
  //         arguments_schema:
  //           '{"42feeb23-96f2-4363-b145-406a6f1b266d":{"placement":"local","value":["primitive","number"]}}',
  //         script_schema:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":"bba679fa-9619-40b1-a3de-c81ec13cf005"}]},"end":{"id":"end","prev_id":"bba679fa-9619-40b1-a3de-c81ec13cf005","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"bba679fa-9619-40b1-a3de-c81ec13cf005":{"id":"bba679fa-9619-40b1-a3de-c81ec13cf005","module":"Math","wrapper":"AddOne","wrapper_arguments":{"placement":"mixed","value":{"a":{"placement":"context","value":"42feeb23-96f2-4363-b145-406a6f1b266d"}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         script_schema_raw:
  //           '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":"bba679fa-9619-40b1-a3de-c81ec13cf005"}]},"end":{"id":"end","prev_id":"bba679fa-9619-40b1-a3de-c81ec13cf005","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"bba679fa-9619-40b1-a3de-c81ec13cf005":{"id":"bba679fa-9619-40b1-a3de-c81ec13cf005","module":"Math","wrapper":"AddOne","wrapper_arguments":{"placement":"mixed","value":{"a":{"placement":"context","value":["primitive","number"]}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //         result_schema: '["primitive","number"]',
  //       },
  //     ],
  //   };

  //   return { data: script_map[script_id] };
  // }

  return api.get("/storage/getScriptVersionsById/" + script_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptArgumentsSchema(id: string) {
  return api.get("/storage/getScriptArgumentsSchema/" + id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getScriptReturnValueSchema(script_id: string) {
  return api.get("/storage/getScriptReturnValueSchema/" + script_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function saveScriptAsDraft(
  account_id: string,
  script: any,
  name: string,
  description: string,
  creator_id: string
) {
  return api.post<{
    id: string;
    name: string;
    description: string;
    creator_id: string;
    account_id: string;
  }>(
    "/storage/saveScriptAsDraft/" + account_id,
    {
      script,
      name,
      description,
      creator_id,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function updateScriptDraft(
  script_id: string,
  version: number,
  script: any
) {
  return api.patch(
    "/storage/updateScriptDraft/" + script_id,
    {
      version,
      script,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function saveScriptForTesting(script_id: string, version: number) {
  return api.post<{
    arguments_schema: string;
    created_at: string;
    result_schema: string;
    script_id: string;
    script_schema: string;
    script_schema_raw: string;
    status: "TESTING";
    version: number;
  }>(
    "/storage/saveScriptForTesting/" + script_id,
    {
      version,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function saveScriptForProduction(
  script_id: string,
  version: number
) {
  return api.post(
    "/storage/saveScriptForProduction/" + script_id,
    {
      version,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function checkScript(script_id: string, version: number) {
  return api.post(
    "/storage/checkScript/" + script_id,
    {
      version,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function createScriptProcess(
  script: { script_schema: string },
  script_arguments: object
) {
  return api.post(
    "/kernel/createScriptProcess",
    {
      blockCallSchema: script.script_schema,
      is_testing: true,
      script_arguments,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function addScript(
  account_id: string,
  name: string,
  description: string,
  version: number,
  script_arguments: object,
  script: any,
  script_id: string,
  config: {
    allowedMethods: string;
    requiredHeaders: string;
    waitForScriptEnd: boolean;
  }
) {
  return api.post(
    "/webhook-trigger/addScript/",
    {
      account_id,
      script_id,
      script,
      config,
      name,
      description,
      version,
      script_arguments,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function getAllScripts(account_id: string) {
  // return {
  //   status: 200,
  //   data: [
  //     {
  //       id: 1,
  //       createdAt: "2023-09-11T19:29:40.533Z",
  //       name: "Default name",
  //       description: "Default description",
  //       version: 1,
  //       enable: true,
  //       uniqueId: "a268f94b-98be-42cd-bbad-35aee936c57a",
  //       scriptJSON:
  //         '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //       script_arguments: "{}",
  //       accountId: 1,
  //       configId: 1,
  //     },
  //     {
  //       id: 2,
  //       createdAt: "2023-09-11T19:30:13.148Z",
  //       name: "Default name",
  //       description: "Default description",
  //       version: 1,
  //       enable: true,
  //       uniqueId: "a268f94b-98be-42cd-bbad-35aee936c57a",
  //       scriptJSON:
  //         '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //       script_arguments: "{}",
  //       accountId: 1,
  //       configId: 2,
  //     },
  //     {
  //       id: 3,
  //       createdAt: "2023-09-11T20:01:29.219Z",
  //       name: "Default name",
  //       description: "Default description",
  //       version: 1,
  //       enable: true,
  //       uniqueId: "a268f94b-98be-42cd-bbad-35aee936c57a",
  //       scriptJSON:
  //         '{"start":{"id":"start","prev_id":"","module":"StartEnd","wrapper":"Start","wrapper_arguments":{},"wrapper_result_schema":[],"next":[{"id":""}]},"end":{"id":"end","prev_id":"","module":"StartEnd","wrapper":"End","wrapper_arguments":{},"wrapper_result_schema":[],"next":[]},"":{"id":"","module":"Math","wrapper":"AddNumbers","wrapper_arguments":{"placement":"local","value":{"a":{"placement":"local","value":1},"b":{"placement":"local","value":2}}},"wrapper_result_schema":["primitive","number"],"prev_id":"start","next":[{"id":"end"}]}}',
  //       script_arguments: "{}",
  //       accountId: 1,
  //       configId: 3,
  //     },
  //   ],
  // };
  return api.get("/webhook-trigger/getAllScripts/" + account_id, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function setEnableOrDisable(script_id: number, enable: boolean) {
  return api.patch(
    "/webhook-trigger/setEnableOrDisable/" + script_id,
    {
      enable,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function getAllModulesKeys() {
  // return {
  //   data: ["StartEnd", "Math", "String", "Number"],
  // };

  return api.get("/kernel/getAllModulesKeys", {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function getAllModuleFunctionsByModuleTag(module_tag: string) {
  // if (module_tag === "StartEnd")
  //   return {
  //     data: [
  //       {
  //         module: "StartEnd",
  //         wrapper: "Start",
  //         wrapper_arguments: {
  //           avalible_from: ["local"],
  //           arg_schema: {},
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //       {
  //         module: "StartEnd",
  //         wrapper: "End",
  //         wrapper_arguments: {
  //           avalible_from: ["local"],
  //           arg_schema: {},
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //     ],
  //   };
  // if (module_tag === "Math")
  //   return {
  //     data: [
  //       {
  //         module: "Math",
  //         wrapper: "AddNumbers",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             a: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "number"],
  //             },
  //             b: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "number"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //     ],
  //   };
  // if (module_tag === "String")
  //   return {
  //     data: [
  //       {
  //         module: "String",
  //         wrapper: "Concat",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             firstString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //             concat_symbol: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //             secondString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "string"],
  //       },
  //       {
  //         module: "String",
  //         wrapper: "Length",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             inputString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //       {
  //         module: "String",
  //         wrapper: "Split",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             firstString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //             concat_symbol: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //             secondString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["module", "List"],
  //       },
  //       {
  //         module: "String",
  //         wrapper: "Trim",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             inputString: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "string"],
  //       },
  //     ],
  //   };
  // if (module_tag === "Number")
  //   return {
  //     data: [
  //       {
  //         module: "Number",
  //         wrapper: "ParseFloat",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             expect_number: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //       {
  //         module: "Number",
  //         wrapper: "ParseInt",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             expect_number: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "number"],
  //       },
  //       {
  //         module: "Number",
  //         wrapper: "ToString",
  //         wrapper_arguments: {
  //           avalible_from: ["local", "context"],
  //           arg_schema: {
  //             expect_number: {
  //               avalible_from: ["local", "other_wrapper", "context"],
  //               type: ["primitive", "string"],
  //             },
  //           },
  //         },
  //         wrapper_result_schema: ["primitive", "string"],
  //       },
  //     ],
  //   };
  return api.get("/kernel/getAllModuleFunctionsByModuleTag/" + module_tag, {
    headers: {
      Authorization: await getAuthToken(),
    },
  });
}

export async function setEnableOrDisableWebTriggerScript(
  script_id: number,
  enable: boolean
) {
  return api.patch(
    "/webhook-trigger/setEnableOrDisable/" + String(script_id),
    {
      enable,
    },
    {
      headers: {
        Authorization: await getAuthToken(),
      },
    }
  );
}

export async function getAccounts(user_id: string): Promise<Account[]> {
  return [ScriptImpl0Account];
}

export async function getAccountScripts(
  account_id: string,
  offset: 10 | 20 | 50 | 100 = 10,
  limit: 10 | 20 | 50 | 100 = 10
): Promise<Script[]> {
  return ScriptsData;
}

export async function getScriptVersions(
  script_id: string
): Promise<ScriptVersion[]> {
  return OnlyScriptVersions;
}

export async function getScriptsVersions(
  script_ids: string[]
): Promise<ScriptVersion[]> {
  return OnlyScriptVersions;
}

export async function getWebTriggerScriptVersions(
  script_id: string
): Promise<ScriptVersion[]> {
  return OnlyScriptVersions;
}

export async function getWebTriggerScriptsVersions(
  script_ids: string[]
): Promise<ScriptVersion[]> {
  return OnlyScriptVersions;
}
