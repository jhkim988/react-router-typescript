import { EditArgs } from "../edit";
import { Contact, ContactActionArgs, ContactLoaderArgs } from "./types";

let contactDataList: Array<Contact> = [
  {
    id: "1",
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: "2",
    first: "Your",
    last: "Friend",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "twitter",
    notes: "notes",
    favorite: true,
  },
];

export async function loader({
  params,
}: ContactLoaderArgs): Promise<{ contact: Contact | null }> {
  if (params.contactId === undefined) {
    throw new Response("", { status: 400, statusText: "Bad Request" });
  }
  const contact = await getContact(params.contactId);

  if (contact === null) {
    throw new Response("", { status: 404, statusText: "Not Found" });
  }

  return { contact };
}

export async function getContacts(
  keyword: string | null
): Promise<Array<Contact>> {
  return contactDataList.filter(
    (d) => d.first.includes(keyword ?? "") || d.last.includes(keyword ?? "")
  );
}

export async function getContact(contactId: string): Promise<Contact | null> {
  return contactDataList.find((d) => d.id === contactId) ?? null;
}

export async function deleteContact(contactId: string) {
  contactDataList = contactDataList.filter((d) => d.id !== contactId);
}

export async function updateContact(contactId: string, updates: EditArgs) {
  const idx = contactDataList.findIndex((d) => d.id === contactId);
  if (idx >= 0) {
    contactDataList[idx] = Object.assign(contactDataList[idx], updates);
  }
}

export async function updateContactFavorite(
  contactId: string,
  favorate: boolean
) {
  const find = contactDataList.find((d) => d.id === contactId);
  if (find === undefined) {
    throw new Error("There is no contact");
  }
  find.favorite = favorate;
  return favorate;
}

let id: number = 3;
export async function createContact() {
  contactDataList.push({
    id: `${id++}`,
    first: "No",
    last: "Name",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: false,
  });
}

export async function action({ request, params }: ContactActionArgs) {
  const formData = await request.formData();

  if (!params.contactId) {
    console.error(formData);
    throw new Error("Wrong params");
  }

  return updateContactFavorite(
    params.contactId,
    formData.get("favorite") === "true"
  );
}
