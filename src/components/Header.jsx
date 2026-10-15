import React from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const nav = useNavigate();

  return (
    <header className="w-full bg-slate-950/90 flex justify-between items-center px-3 py-2 fixed top-0 left-0">
      <h1>App</h1>

      <nav className="flex gap-4">
        {/* Absolute Pathing */}
        <button onClick={() => nav("/")}>Dashboard</button>
        <button onClick={() => nav("/profile")}>Profile</button>
      </nav>
    </header>
  );
}
