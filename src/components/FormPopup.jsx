import React from "react";
import { useState } from "react";

const defaultForm = {
  name: "",
  level: 1,
  type: "e",
  img: null,
};

export default function FormPopup({ setFormVisible, createPokemon }) {
  const [formData, setFormData] = useState(defaultForm);

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

    createPokemon(formData);
    setFormData(defaultForm);
    e.target.reset();
    setFormVisible(false)
  }

  return (
    <div className="absolute top-0 bg-black/70 text-4xl h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white text-black w-[40vw] flex flex-col gap-4 p-5"
      >
        {/* Name Field */}
        <div className="flex gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        {/* Level Field */}
        <div className="flex gap-2">
          <label htmlFor="level">Level</label>
          <input
            type="number"
            name="level"
            id="level"
            min={1}
            value={formData.level}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        {/* Type Field */}
        <div className="flex gap-2">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="Electric">Electric</option>
            <option value="Plant">Plant</option>
            <option value="Water">Water</option>
            <option value="Fire">Fire</option>
            <option value="Rock">Rock</option>
            <option value="Air">Air</option>
          </select>
        </div>

        {/* Image Field */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            <label htmlFor="img">Image: </label>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleImageChange}
              className="w-full text-3xl"
            />
          </div>

          {formData.img && (
            <img
              src={formData.img}
              className="size-20 rounded-full border-2 border-black"
            />
          )}
        </div>

        {/* Action Field */}
        <div className="flex gap-5 justify-center">
          <button
            type="submit"
            className="bg-green-800 border rounded-lg px-3 py-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setFormVisible(false)}
            className="bg-red-800 border rounded-lg px-3 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
