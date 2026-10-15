import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const nav = useNavigate()

  return (
    <div className="bg-slate-950 text-white text-6xl min-h-screen">
      <header>
        <h1>App</h1>

        <nav>
          <button onClick={() => nav('/')}>Dashboard</button>
          <button onClick={() => nav('/profile')}>Profile</button>
        </nav>
      </header>

      <main className="bg-slate-900">
        {/* <Dashboard /> */}
        <Outlet />
      </main>
    </div>
  );
}
