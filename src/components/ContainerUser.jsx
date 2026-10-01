import React from "react";
import { useState } from "react";
import FormUser from "./FormUser";
import Card from "./Card";

export default function ContainerUser() {
  const [userEditing, setUserEditing] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Frierens",
      age: 1000,
    },
    {
      id: 2,
      username: "Fern",
      age: 22,
    },
    {
      id: 3,
      username: "Stark",
      age: 22,
    },
  ]);

  return (
    <div className="w-full flex flex-col gap-8">
      <FormUser users={users} setUsers={setUsers} />

      {/* DRY Principle
        Don't Repeat Yourself
      */}
      {/* <Card />
      <Card />
      <Card /> */}

      {/* Problem 1: How to display a number of Card component base on how many users we have?

        Syntax:
        Array.map((callback) => (
          code block
        ))
      */}

      <section className="w-full flex gap-4">
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}
