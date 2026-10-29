import React from "react";
import Card from "./Card";
import { useState } from "react";

export default function Gallery({ pokemons }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Ascending");

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLocaleLowerCase().trim()),
  ).sort((a, b) => sort == "Ascending" ? a.id - b.id : b.id - a.id);

  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() =>
            setSort(sort == "Ascending" ? "Descending" : "Ascending")
          }
        >
          ID: {sort}
        </button>
      </section>

      <section className="flex flex-wrap gap-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((p) => <Card pokemon={p} />)
        ) : (
          <p>No match Pokemon!</p>
        )}

        {/* <Card pokemon={pokemons[0]} />
        <Card pokemon={pokemons[1]} /> */}
      </section>
    </div>
  );
}
