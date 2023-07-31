import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";

export type Contact = {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};

export interface ContactLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<"/contact/:contactId">>;
}

export interface ContactActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<"/contact/:contactId">>;
}
