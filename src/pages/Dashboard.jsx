import { useState, useEffect } from "react";
import Card from "../components/Card";
import Form from "../components/Form";

import Frieren from "../assets/default.jpg";
import Fern from "../assets/fern.jfif";

const defaultUsers = [
  { id: 1, name: "Frieren", avatar: Frieren },
  { id: 2, name: "Fern", avatar: Fern },
];

export default function Dashboard() {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("users");
      return saved ? JSON.parse(saved) : defaultUsers;
    } catch {
      return defaultUsers;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
      console.error("Could not save users:", err);
    }
  }, [users]);

  return (
    <div className="flex flex-col gap-5">
      <p>Dashboard</p>
      <Form setUsers={setUsers} />
      <section className="flex gap-5">
        {users.map((u) => (
          <Card key={u.id} user={u} />
        ))}
      </section>
    </div>
  );
}