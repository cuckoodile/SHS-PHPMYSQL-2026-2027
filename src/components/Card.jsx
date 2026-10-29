import React from "react";
import { useNavigate } from "react-router";

export default function Card({ user }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/profile/${user.id}`)}
      className="w-80 h-fit border rounded-md p-2 cursor-pointer flex flex-col gap-5 group relative"
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="h-60 w-full rounded-md"
      />
      <p>Name: {user.name}</p>

      {/* Collapsible wrapper */}
      <div className="grid grid-rows-[0fr] -mt-5 opacity-0 transition-all duration-300 ease-out group-hover:grid-rows-[1fr]  group-hover:opacity-100">
        <div className="overflow-hidden">
          <span className="inline-block rounded bg-black/70 px-2 py-1 text-xs text-white">
            ID: {user.id}
          </span>
        </div>
      </div>
    </div>
  );
}