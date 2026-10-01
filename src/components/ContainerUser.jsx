import { useState } from "react";
import FormUser from "./FormUser";
import Card from "./Card";

export default function ContainerUser() {
  const [userEditing, setUserEditing] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "frieren",
      age: 1000,
    },
  ]);

  const userToEdit = users.find((u) => u.id === userEditing) ?? null;

  function handleDelete(id) {
    setUsers(users.filter((user) => user.id !== id));
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
