import React from "react";
import { useRouteError } from "react-router-dom";
import "./App.css";

export default function ErrorPage() {
  console.log("render error");
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oh my word!</h1>
      <p>{`Sorry, we couldn't load this game.`}</p>
      <p id="error-text">{"Error: " + error.statusText || error.message}</p>
    </div>
  );
}
