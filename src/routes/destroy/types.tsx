import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";

export interface DestroyActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<"/contact/:contactId/destroy">>;
}
