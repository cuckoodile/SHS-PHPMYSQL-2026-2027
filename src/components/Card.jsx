import React from "react";

export default function Card({ user }) {
  /* Problem 2: How can we make the Card data dynamic?
        Parameter (Params) and Arguments

        let user = {
            id: 1,
            username: "Frierens",
            age: 1000,
        }
    */

  console.log(user);

  return (
    <div className="border-2 p-3 flex flex-col gap-3 rounded-lg text-3xl">
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
