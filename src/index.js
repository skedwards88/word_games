import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.js";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ErrorPage from "./errorPage.js";
import Gribbles from "./gribbles/components/Gribbles";
import Thirdle from "./thirdle/components/Thirdle";
import Palette from "./palette/components/Palette";
import Packed from "./packed/components/Packed";
import Crossle from "./crossle/components/Crossle";
import Crossjig from "./crossjig/components/Crossjig";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "gribbles",
    element: <Gribbles />,
  },
  {
    path: "thirdle",
    element: <Thirdle />,
  },
  {
    path: "palette",
    element: <Palette />,
  },
  {
    path: "crossle",
    element: <Crossle />,
  },
  {
    path: "crossjig",
    element: <Crossjig />,
  },
  {
    path: "packed",
    element: <Packed />,
  },
]);

if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator) {
  const path =
    location.hostname === "localhost"
      ? "/service-worker.js"
      : "/word_games/service-worker.js";
  const scope = location.hostname === "localhost" ? "" : "/word_games/";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(path, { scope: scope })
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
