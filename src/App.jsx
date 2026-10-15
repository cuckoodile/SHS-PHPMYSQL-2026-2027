import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="bg-slate-950 text-white text-6xl min-h-screen">
      <h1>App</h1>

      <main className="bg-slate-900">
        {/* <Dashboard /> */}
        <Outlet />
      </main>
    </div>
  );
}
