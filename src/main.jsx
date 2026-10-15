import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import routes from "./routes/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Context Provider or in general: Wrapper */}
    <RouterProvider router={routes} />
  </StrictMode>,
);
