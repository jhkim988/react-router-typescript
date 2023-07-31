import { redirect } from "react-router";
import { EditActionArgs, isEditArgs } from "./types";
import { updateContact } from "../contact";

export async function action({ request, params }: EditActionArgs) {
  if (params.contactId === undefined) {
    console.error(params);
    throw new Error(`Wrong parameter`);
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  /* formData 에서 name 값의 value를 가져오는 방법 */
  // const firstName = formData.get("first");
  // const lastName = formData.get("last");

  if (isEditArgs(updates)) {
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

  console.log(updates);
  throw new Error("Wrong formData");
}
