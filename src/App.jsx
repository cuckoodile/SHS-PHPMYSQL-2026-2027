// Packages and Files
import React, { useState } from "react";

// Components
import Counter from "./components/Counter";
import Card from "./components/Card";
import FormUser from "./components/FormUser";

export default function App() {
  /* React Hooks
  useState
  Syntax:
      import React, { useState } from "react";

      const [getter, setter] = useState(defaultValue)
      const [getter, setter] = React.useState(defaultValue)
      
      const [counter, setCounter] = useState(0)

      let counter = 0

      DOM Manipulation
      const div = document.getElementbyId('container-div')

      const paragraph = document.createElement(p)
      paragraph.innerText = "This is a container"

      div.append(paragraph)


    useEffect

    useRef
  */

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
    <div className="min-h-screen bg-slate-900 text-white text-6xl p-5 flex flex-col items-center gap-8">
      {/* <Counter /> */}

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
