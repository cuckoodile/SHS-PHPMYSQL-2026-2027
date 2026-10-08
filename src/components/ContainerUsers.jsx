import React from "react";
import Card from "./Card";

export default function ContainerUsers({users=[]}) {
  return (
    <div className="flex border rounded-lg p-4">
      <Card user={users[0]} />

      {/* {users.map()} */}
    </div>
  );
}
