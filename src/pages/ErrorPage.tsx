import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  console.error(error, isRouteErrorResponse(error));

  /* typescript: type 축소를 통해 error 유형을 추론해야 한다. */
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText; // error.error?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
