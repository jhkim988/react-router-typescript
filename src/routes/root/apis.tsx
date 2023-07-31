import { RootLoaderArgs } from ".";
import { Contact, createContact, getContacts } from "../contact";

export async function loader({
  request,
}: RootLoaderArgs): Promise<{ contacts: Array<Contact>; q: string | null }> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}
