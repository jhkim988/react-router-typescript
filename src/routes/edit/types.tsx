import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";

export interface EditActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<"/contact/:contactId/edit">>;
}

export type EditArgs = {
  first: string;
  last: string;
  twitter: string;
  avatar: string;
  notes: string;
};

export function isEditArgs(obj: unknown): obj is EditArgs {
  return (
    obj != null &&
    typeof obj === "object" &&
    "first" in obj &&
    typeof obj.first === "string" &&
    "last" in obj &&
    typeof obj.last === "string" &&
    "avatar" in obj &&
    typeof obj.avatar === "string" &&
    "twitter" in obj &&
    typeof obj.twitter === "string" &&
    "notes" in obj &&
    typeof obj.notes === "string"
  );
}
