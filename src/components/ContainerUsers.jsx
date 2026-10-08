import React from "react";
import Card from "./Card";

export default function ContainerUsers({users=[]}) {
  return (
    <div className="flex-1 w-full flex border rounded-lg p-4 gap-4">
      <Card user={users[0]} />
      <Card user={users[0]} />
      <Card user={users[0]} />
      <Card user={users[0]} />

      {/* {users.map()} */}
    </div>
  );
}
