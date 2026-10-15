import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white text-6xl flex flex-col gap-5 items-center justify-center ">
      <h1>Not found!</h1>

      <p>San ka punta?</p>

      <button onClick={() => nav(-1)}>Back</button>
    </div>
  );
}
