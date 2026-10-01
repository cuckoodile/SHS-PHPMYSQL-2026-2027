import { useEffect } from "react";
import { useState } from "react";

const emptyForm = { username: "", age: 0 };

// Our component standard name is title case.
export default function FormUser({
  users,
  setUsers,
  userToEdit,
  onUpdate,
  onCancel,
}) {
  const [isVisible, setVisible] = useState(true);
  const [nextId, setNextId] = useState(users.length + 1);
  const [formData, setFormData] = useState({
    username: "",
    age: 0,
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({ username: userToEdit.username, age: userToEdit.age });
      setVisible(true);
    } else {
      setFormData(emptyForm);
    }
  }, [userToEdit]);

  function handleCounterVisibility() {
    setVisible(!isVisible);
    // true ==> false   and vice-versa

    if (isVisible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const cleanData = { ...formData, age: Number(formData.age) };

    if (userToEdit) {
      onUpdate({ ...userToEdit, ...cleanData });
    } else {
      setNextId((prev) => prev + 1);
      setUsers([{ id: nextId, ...cleanData }, ...users]);
    }

    setFormData(emptyForm);
  }

  function handleInputOnChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {isVisible && (
        <form
          onSubmit={handleFormSubmit}
          className="border p-4 rounded-2xl text-center flex flex-col gap-6"
        >
          {/* Form Title Section */}
          <section>
            <h3>Create User</h3>
          </section>

          {/* Fill Up Section */}
          <section className="text-4xl">
            {/* Username Field */}
            <div>
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleInputOnChange}
                value={formData.username}
              />
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                onChange={handleInputOnChange}
                value={formData.age}
              />
            </div>

            {/* Action Fields */}
            <button type="submit">{userToEdit ? "Update" : "Create"}</button>
            {userToEdit && (
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </section>
        </form>
      )}

      <button onClick={handleCounterVisibility} className="border">
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
