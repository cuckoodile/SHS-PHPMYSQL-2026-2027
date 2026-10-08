import React, { useState } from "react";

import FormUser from "./components/FormUser";
import ContainerUsers from "./components/ContainerUsers";

export default function App() {
  // Getter: users | Setter: setUsers | Default value: [{...}]
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "Frieren",
      last_name: "The Slayer",
      age: 1000,
      gender: "f",
    },
  ]);

  return (
    <main className="bg-slate-950 text-white text-6xl min-h-screen">
      <h1>Users Gallery</h1>

      {/* Form Section */}
      <FormUser />

      {/* User Gallery Section */}
      <ContainerUsers users={users} />
    </main>
  );
}
