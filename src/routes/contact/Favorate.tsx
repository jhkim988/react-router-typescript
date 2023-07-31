import { Contact } from "./types";
import { useFetcher } from "react-router-dom";

/* 구조분해 할당에서 타입 */
export function Favorite({ contact }: { contact: Contact }) {
  const fetcher = useFetcher(); // 페이지 이동을 유발하지 않고 데이터를 변경하고 싶을 때
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
