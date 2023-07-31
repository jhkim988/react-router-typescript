import { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { Contact } from "../contact";

export default function Root() {
  const { contacts, q } = useLoaderData() as {
    contacts: Array<Contact>;
    q: string | null;
  };
  const navigation = useNavigation(); // 상태에 따라 "idle" | "submitting" | "loading"

  // input value 와 url param 동기화
  const [query, setQuery] = useState(q ?? "");
  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  const submit = useSubmit(); // onChange 이벤트가 발생할 때마다 submit 하는 방법, 이렇게 되면 history stack(뒤로가기)에 타이핑 할 때마다 쌓이게 된다.
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);

                const isFirstSearch = q === null;
                submit(e.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div id="search_spinner" aria-hidden hidden={!searching} />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.length ? (
              contacts.map((contact: Contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`/contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first} {contact.last}
                  </NavLink>
                </li>
              ))
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
