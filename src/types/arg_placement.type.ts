// export type ArgPlacementArray =
//   | ["local", "other_wrapper", "context"]
//   | ["local", "other_wrapper"]
//   | ["local", "context"]
//   | ["other_wrapper", "context"]
//   | ["local"]
//   | ["other_wrapper"]
//   | ["context"];

// export type ArgPlacementArrayNoLocal = Exclude<
//   ArgPlacementArray,
//   | ["local", "other_wrapper", "context"]
//   | ["local", "other_wrapper"]
//   | ["local", "context"]
//   | ["local"]
// >;

export type ArgPlacementArrayWithMixed = [
  "local",
  "mixed",
  "other_wrapper",
  "context"
];
// | ["local", "other_wrapper", "context", "mixed"]
// | ["local", "other_wrapper", "mixed"]
// | ["local", "context", "mixed"]
// | ["other_wrapper", "context", "mixed"]
// | ["local", "mixed"]
// | ["other_wrapper", "mixed"]
// | ["context", "mixed"]
// | ["mixed"]
// | ArgPlacementArray;

export type ArgPlacementArray =
  | ["local", "other_wrapper", "context"]
  | ["local", "context"]
  | ["local", "other_wrapper"]
  | ["other_wrapper", "context"]
  | ["local"]
  | ["mixed"]
  | ["other_wrapper"]
  | ["context"]
  | ["mixed", "other_wrapper", "context"]
  | ["mixed", "context"]
  | ["mixed", "other_wrapper"]
  | ["other_wrapper", "context"];

export type ArgPlacement = "local" | "other_wrapper" | "context";

export type ArgPlacementWithMixed = ArgPlacement | "mixed";
