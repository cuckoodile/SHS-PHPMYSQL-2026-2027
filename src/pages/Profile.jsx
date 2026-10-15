import React from "react";
import { useParams } from "react-router";

const users = [
  {
    id: 1,
    fullname: "Ian Sube",
    age: 99,
    description: "An instructor at MFI Polytechnic Institute.",
  },
  {
    id: 2,
    fullname: "Chounce De Guzman",
    age: 10,
    description: "Makulit....",
  },
];

export default function Profile() {
  const userParams = useParams();

  /*
    useParams return an object

    useParams = {
    id: 2
    }
  */

  return (
    <div>
      <p>{userParams.id}</p>

      {users.map((u) =>
        userParams.id == u.id ? (
          <div>
            <p>{u.fullname}</p>
            <p>{u.age}</p>
            <p>{u.description}</p>
          </div>
        ) : null,
      )}
    </div>
  );
}
