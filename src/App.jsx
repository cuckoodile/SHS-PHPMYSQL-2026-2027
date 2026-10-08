import React, { useEffect, useReducer, useState } from "react";

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
    {
      id: 2,
      first_name: "Fern",
      last_name: "The Slayer",
      age: 1000,
      gender: "f",
    },
    {
      id: 3,
      first_name: "Stark",
      last_name: "The Slayer",
      age: 1000,
      gender: "m",
    },
  ]);

  const [idCounter, setIdCounter] = useState(users.length + 1);

  useEffect(() => {
    setIdCounter(idCounter + 1);

    console.log(users)
  }, [users]);

  return (
    <main className="bg-slate-950 text-white text-6xl min-h-screen flex flex-col items-center gap-8 p-4">
      <h1>Users Gallery</h1>

      {/* Form Section */}
      <FormUser
        setUsers={setUsers}
        users={users}
        idCounter={idCounter}
        setIdCounter={setIdCounter}
      />

      {/* User Gallery Section */}
      <ContainerUsers users={users} />
    </main>
  );
}
