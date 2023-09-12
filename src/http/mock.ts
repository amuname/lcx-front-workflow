export interface Account {
  id: string;
  user_id: string;
}

export interface Script {
  id: string;
  name: string;
  description: string;
  creator_id: string;
  account_id: string;
  // account: Account;
  versions: ScriptVersion[];
}

export interface ScriptVersion {
  created_at: string;
  script_id: string;
  // script:            "Script";
  version: number;
  status: string;
  arguments_schema: string;
  // {
  //   [x: string]: { placement: "local"; value: ["primitive", "number"] };
  // };
  script_schema: "Json";
  script_schema_raw: "Json";
  result_schema: "Json";
  // production_script: "ProductionScript";
}

export const ScriptImpl0Account: Account = {
  id: "id_acc_0",
  user_id: "id_user_0",
};

export const ScriptImpl0Ver0: ScriptVersion = {
  created_at: "string",
  script_id: "id_ver_0",
  // script:            "Script";
  version: 1,
  status: "DRAFT",
  arguments_schema: "Json",
  script_schema: "Json",
  script_schema_raw: "Json",
  result_schema: "Json",
};

export const ScriptImpl0Ver0TESTING: ScriptVersion = {
  created_at: "string",
  script_id: "id_ver_0",
  // script:            "Script";
  version: 1,
  status: "TESTING",
  arguments_schema: "Json",
  script_schema: "Json",
  script_schema_raw: "Json",
  result_schema: "Json",
};

export const ScriptImpl0Ver0PROD: ScriptVersion = {
  created_at: "string",
  script_id: "id_ver_0",
  // script:            "Script";
  version: 1,
  status: "PROD",
  arguments_schema: "Json",
  script_schema: "Json",
  script_schema_raw: "Json",
  result_schema: "Json",
};
export const ScriptImpl0Ver1PROD: ScriptVersion = {
  created_at: "string",
  script_id: "id_ver_1",
  // script:            "Script";
  version: 1,
  status: "PROD",
  arguments_schema: "Json",
  script_schema: "Json",
  script_schema_raw: "Json",
  result_schema: "Json",
};

export const ScriptImpl0: Script = {
  id: "id_0",
  name: "My supet name",
  description: "description",
  creator_id: "id_user_0",
  account_id: "id_acc_0",
  // account: ScriptImpl0Account,
  versions: [ScriptImpl0Ver0],
};

export const OnlyScriptVersions = [
  ((ScriptImpl0Ver0.script_id = "ad"), ScriptImpl0Ver0),
  ScriptImpl0Ver0TESTING,
  ScriptImpl0Ver0TESTING,
  ScriptImpl0Ver0PROD,
  ScriptImpl0Ver0,
  ScriptImpl0Ver0,
  ScriptImpl0Ver0,
  ScriptImpl0Ver1PROD,
  ScriptImpl0Ver0TESTING,
  ScriptImpl0Ver0,
];

export const ScriptWithManyVersions: Script = {
  id: "id_1",
  name: "Many vers",
  description: "Maanyyy vers description",
  creator_id: "id_user_0",
  account_id: "id_acc_0",
  // account: ScriptImpl0Account,
  versions: OnlyScriptVersions,
};

export const ScriptsData = [
  ScriptImpl0,
  ScriptWithManyVersions,
  ScriptImpl0,
  ScriptWithManyVersions,
];

export interface TriggerScript {
  id: number;
  name: string;
  description: string;
  version: number;
  enable: boolean;
  uniqueId: string;
  scriptJSON: string;
  script_arguments: string;
}
