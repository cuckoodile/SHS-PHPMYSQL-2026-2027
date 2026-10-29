import { useState } from "react";

const defaultForm = { name: "", avatar: null };

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Form({ setUsers }) {
  const [formData, setFormData] = useState(defaultForm);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0] || null;
    setFormData((prev) => ({ ...prev, avatar: file }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target; // capture before the await

    const name = formData.name.trim();
    if (!name || !formData.avatar) {
      alert("Please enter a valid name and avatar");
      return;
    }

    const avatar = await readAsDataURL(formData.avatar);

    setUsers((prev) => [...prev, { id: crypto.randomUUID(), name, avatar }]);
    setFormData(defaultForm);
    form.reset();
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}