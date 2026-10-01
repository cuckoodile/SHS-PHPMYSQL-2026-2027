import { useState } from "react";

// Our component standard name is title case.
export default function FormUser({ users, setUsers }) {
  const [isVisible, setVisible] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    username: "",
    age: 0,
  });

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

    alert("Hello world!");
  }

  return (
    <div className="flex flex-col gap-7 items-center">
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
              <input type="text" name="username" id="username" />
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age">Age</label>
              <input type="number" name="age" id="age" />
            </div>

            {/* Action Fields */}
            <button>Create</button>
          </section>
        </form>
      )}
      <button onClick={handleCounterVisibility} className="border">
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
