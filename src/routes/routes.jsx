import { createBrowserRouter } from "react-router";

import App from "../App";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

// Default exports can only be done once in every file.
// We use default to give importance to an export.
export default routes;

// Exports can be done infinitely.
// export let name = "ian";
// export let gender = "Male";
// export let age = 99;
