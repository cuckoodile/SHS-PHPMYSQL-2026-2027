import React from "react";
import Card from "./Card";

export default function ContainerUsers({ users = [] }) {
  return (
    <div className="flex-1 w-full flex border rounded-lg p-4 gap-4 flex-wrap">
      {users.map((user) => (
        <Card user={user} />
      ))}
    </div>
  );
}
