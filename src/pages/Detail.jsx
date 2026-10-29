import React from "react";
import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";

export default function Detail() {
  const { id } = useParams();
  const { pokemons, deletePokemon, updatePokemon } = useOutletContext();
  const nav = useNavigate();
  const pokemon = pokemons.find((p) => id == p.id);

  const [isUpdate, setUpdate] = useState(false);
  const [formData, setFormData] = useState(pokemon);

  // console.log(pokemon.type);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    setFormData({ ...formData, img: URL.createObjectURL(file) });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    updatePokemon(formData.id, formData);
    setFormData(pokemon);
    e.target.reset();
    setUpdate(false);
  }

  if (!pokemon) {
    return (
      <>
        <p>No Pokemon with ID: {id} found!</p>
        <button onClick={() => nav(-1)}>Back</button>
      </>
    );
  }

  return isUpdate ? (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center items-center"
    >
      <div className="w-200 flex flex-col">
        <img
          src={formData.img}
          alt=""
          className="size-100 rounded-full border-5"
        />
        <input
          type="file"
          name="img"
          id="img"
          className="flex-1"
          onChange={handleImageChange}
        />
      </div>

      <section className="flex flex-col">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="level">Level: </label>
          <input
            type="number"
            name="level"
            id="level"
            value={formData.level}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            defaultValue={formData.type}
            onChange={handleInputChange}
          >
            <option value="Electric" className="text-black">
              Electric
            </option>
            <option value="Plant" className="text-black">
              Plant
            </option>
            <option value="Water" className="text-black">
              Water
            </option>
            <option value="Fire" className="text-black">
              Fire
            </option>
            <option value="Rock" className="text-black">
              Rock
            </option>
            <option value="Air" className="text-black">
              Air
            </option>
          </select>
        </div>

        <div className="flex justify-center gap-5">
          <button
            type="submit"
            className="bg-green-700 rounded-lg px-3 py-2 border"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setUpdate(false)}
            className="bg-red-700 rounded-lg px-3 py-2 border"
          >
            Cancel
          </button>
        </div>
      </section>
    </form>
  ) : (
    <div className="flex justify-center items-center gap-10">
      <img
        src={pokemon.img}
        onClick={() => nav("/")}
        alt=""
        className="size-100 rounded-full border-5"
      />

      <section>
        <p>Name: {pokemon.name}</p>
        <p>Type: {pokemon.type}</p>
        <p>Level: {pokemon.level}</p>
        <p>ID: {id}</p>

        <div className="flex justify-center gap-5">
          <button
            onClick={() => setUpdate(true)}
            className="bg-green-700 rounded-lg px-3 py-2 border"
          >
            Update
          </button>
          <button
            onClick={() =>
              isUpdate ? setUpdate(false) : deletePokemon(pokemon.id)
            }
            className="bg-red-700 rounded-lg px-3 py-2 border"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
