import React from "react";
import { useNavigate } from "react-router";

export default function Card({ pokemon }) {
  const nav = useNavigate();

  // DRY principle (Don't Repeat Yourself)

  return (
    <div
      onClick={() => nav(`detail/${pokemon.id}`)}
      className="border p-3 rounded-md text-3xl flex flex-col"
    >
      <img src={pokemon.img} alt="" className="size-60"/>

      <p className="text-white/60">
        Name: <span className="text-white">{pokemon.name}</span>
      </p>

      <p className="text-white/60">
        Type: <span className="text-white">{pokemon.type}</span>
      </p>

      <div className="flex justify-between gap-3">
        <p className="text-white/60">
          Level: <span className="text-white">{pokemon.level}</span>
        </p>

        <p className="text-white/60 w-20 flex-1">
          ID:{" "}
          <span className="flex-1 text-white text-wrap break-all">
            {pokemon.id}
          </span>
        </p>
      </div>
    </div>
  );
}
