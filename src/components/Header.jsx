import React from "react";
import Ball from "../assets/pokemon-ball.gif";
import Profile from "../assets/profile.png";

export default function Header({ setFormVisible }) {
  return (
    <div className="bg-slate-900 flex justify-between items-center px-4">
      <div className="flex">
        <p>Pokémon</p>
        <img src={Ball} alt="Ball" className="size-20 -mt-1" />
      </div>

      <nav className="flex">
        <button onClick={() => setFormVisible(true)}>Create</button>
        <img src={Profile} alt="" className="size-18" />
      </nav>
    </div>
  );
}
