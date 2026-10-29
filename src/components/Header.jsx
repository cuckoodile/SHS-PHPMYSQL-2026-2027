import React from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const nav = useNavigate();

  return (
    <div className="bg-slate-900 px-5 py-2 flex justify-between border border-b">
      <p>Header</p>

      <nav className="flex gap-4">
        <button onClick={() => nav("/profile/1")}>Profile</button>
        <button onClick={() => nav("/")}>Dashboard</button>
      </nav>
    </div>
  );
}
