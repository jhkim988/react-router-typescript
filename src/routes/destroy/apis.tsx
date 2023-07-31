import { redirect } from "react-router";
import { deleteContact } from "../contact";
import { DestroyActionArgs } from ".";

export async function action({ params }: DestroyActionArgs) {
  if (!params.contactId) {
    throw new Error("Wrong contact Id");
  }

  await deleteContact(params.contactId);
  return redirect("/");
}
