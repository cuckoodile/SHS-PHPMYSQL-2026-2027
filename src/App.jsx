// Functions
import React from "react";
import { Outlet } from "react-router";
import { useState } from "react";

// Assets
import Ngeks from "./assets/pikachu.gif";
import Halaman from "./assets/bulbasaur.gif";
import Tulog from "./assets/snorlax.gif";

// Components
import Header from "./components/Header";

export default function App() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [pokemons, setPokemons] = useState([
    {
      id: 3,
      name: "Snorlax",
      type: "Water",
      level: 99,
      img: Tulog,
    },
    {
      id: 2,
      name: "Bulbasaur",
      type: "Plant",
      level: 10,
      img: Halaman,
    },
    {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      level: 10,
      img: Ngeks,
    },
  ]);

  const [idCounter, setIdCounter] = useState(pokemons.length + 1);

  // data = {
  //   name, "",
  //   type: "",
  //   level: 100,
  //   img: ...
  // }

  function createPokemon(data) {
    setPokemons([{ ...data, id: idCounter }, ...pokemons]);
    setIdCounter(idCounter + 1);
  }

  function updatePokemon(id, data) {
    setPokemons(pokemons.map((p) => (id == p.id ? { ...p, ...data } : p)));
  }

  function deletePokemon(id) {
    setPokemons(pokemons.filter((p) => id != p.id));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-6xl text-white flex flex-col">
      <Header setFormVisible={setFormVisible} />

      <main className="flex-1 flex *:flex-1">
        {/* Dashboard or Detail */}
        <Outlet
          context={{
            pokemons,
            createPokemon,
            updatePokemon,
            deletePokemon,
            isFormVisible,
            setFormVisible,
          }}
        />
      </main>
    </div>
  );
}
