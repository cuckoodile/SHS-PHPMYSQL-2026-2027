import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white text-5xl flex flex-col justify-center items-center gap-5">
      <p className="bg-green-700">Page does not exist!</p>

      <div className="flex gap-5">
        <button onClick={() => nav(-1)} className="bg-red-700">
          Back
        </button>
        <button onClick={() => nav("/")} className="bg-orange-700">
          To Dashboard
        </button>
      </div>
    </div>
  );
}
