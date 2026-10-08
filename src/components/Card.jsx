import React from "react";

export default function Card({ user }) {
  return (
    <div className="border-2 p-4 rounded-lg">
      {/* Null check... */}
      <p>{user?.id || "ID"}</p>
      <p>{user?.first_name || "First Name"}</p>
      <p>{user?.last_name || "Last Name"}</p>
      <p>{user?.age || "Age"}</p>
      <p>{user?.gender == "m" ? "Male" : "Female" || "Gender"}</p>
    </div>
  );
}
