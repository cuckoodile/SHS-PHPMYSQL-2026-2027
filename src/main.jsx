import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
// import routes, { name, age, gender } from "./routes/routes.jsx";
import routes from "./routes/routes.jsx";

import "./index.css";

// console.log(name);
// console.log(age);
// console.log(gender);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,

  // <Providers...>
);
