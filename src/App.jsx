import React from "react";

import Header from "./components/Header";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white text-5xl flex flex-col">
      <Header />

      <main className="p-5 flex-1 flex *:flex-1">
        <Outlet />
      </main>
    </div>
  );
}
