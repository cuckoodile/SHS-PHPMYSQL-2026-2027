import { useState } from "react";
import { useParams } from "react-router";

export default function Profile() {
  const { id } = useParams();

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) ?? [];
    } catch {
      return [];
    }
  });

  const currentUser = users.find((u) => String(u.id) === id);

  if (!currentUser) {
    return <p>No user found!</p>;
  }

  return (
    <div>
      <p>Profile</p>
      <p>ID: {currentUser.id}</p>
      <p>Name: {currentUser.name}</p>
      <img src={currentUser.avatar} alt={currentUser.name} width={96} />
    </div>
  );
}
