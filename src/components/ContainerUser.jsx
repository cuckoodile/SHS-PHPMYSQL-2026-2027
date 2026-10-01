import { useState } from "react";
import FormUser from "./FormUser";
import Card from "./Card";

export default function ContainerUser() {
  const [userEditing, setUserEditing] = useState(null);
  const [users, setUsers] = useState([
    // id: 3 (stark)
    {
      id: 1,
      username: "frieren",
      age: 1000,
    },
    {
      id: 2,
      username: "fern",
      age: 22,
    },
    {
      id: 3,
      username: "stark",
      age: 22,
    },
  ]);

  const userToEdit = users.find((user) => user.id === userEditing) ?? null;
  //   const userToEdit = users.find((user) => 2 === 2) ?? null;
  /* Array.find Syntax
    Array.find((callback) => (
        Condition Block
    ))

    userToEdit = {
      id: 2,
      username: "fern",
      age: 22,
    },
  */

  function handleDelete(id) {
    setUsers(users.filter((user) => user.id !== id));
    /* Filter Syntax
    Array.filter((callback: represents each element in the Array) => (
        Condition Block

        user.id !== id
        if user.id (current iteration) doesn't match the given id (parameter)
        return the iteration

        setUsers([
        {
            id: 1,
            username: "frieren",
            age: 1000,
        },
        {
            id: 2,
            username: "fern",
            age: 22,
        },
        ])
    ))

    */

    if (userEditing === id) setUserEditing(null);
  }

  function handleUpdate(updatedUser) {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setUserEditing(null);
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <FormUser
        users={users}
        setUsers={setUsers}
        userToEdit={userToEdit}
        onUpdate={handleUpdate}
        onCancel={() => setUserEditing(null)}
      />

      <section className="w-full flex gap-4">
        {users.map((user) => (
          <Card
            key={user.id}
            user={user}
            isEditing={userEditing === user.id}
            isLocked={userEditing !== null}
            setEditing={setUserEditing}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </div>
  );
}
