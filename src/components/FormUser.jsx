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
    /* userToEdit possible values
        1. null
        2. Object:
            userToEdit = {
                id: 2,
                username: "fern",
                age: 22,
            },
    */

    if (userToEdit) {
      setFormData({ username: userToEdit.username, age: userToEdit.age });
      setVisible(true);
    } else {
      setFormData(emptyForm);
    }
  }, [userToEdit]);

  /* useEffect Triggers
    1. onMount
        - Execute the code block when the component mounts or after re-renders
    2. onUpdate
        - Execute the code bloch whenever the value of the Dependency Array changes
    3. onUnMount/ onReturn      <-- Skip

    Syntax:
    useEffect(() => {
        Code Block    
    }, [Dependency Array])
  */

  function handleCounterVisibility() {
    setVisible(!isVisible);
    // true ==> false   and vice-versa

    if (isVisible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  function handleFormSubmit(e) {
    // Disables the default page reload on submit
    e.preventDefault();

    const cleanData = { ...formData, age: Number(formData.age) };

    /* What does cleanData do?
        formData = {
        username: 'fern',
        age: '22'
        }
        
        cleanData= {
            username: 'fern',
            age: '22',      <-- Duplicated, remove
            age: 22
        }

        cleanData= {
            username: 'fern',
            age: 22
        }

        Summary:
        1. cleanData copy the formData
        2. cleanData set the age into Number type
        3. cleanData removes the duplicated string age
    */

    if (userToEdit) {
      // Update
      onUpdate({ ...userToEdit, ...cleanData });
    } else {
      // Create
      setNextId((prev) => prev + 1);
      setUsers([{ id: nextId, ...cleanData }, ...users]);
    }

    // Reset the form fields
    setFormData(emptyForm);
  }

  function handleInputOnChange(e) {
    // e stands for the element
    // target is how we get the element's attributes
    const { name, value } = e.target;
    // name = 'age'
    // ...
    // DOM
    // name: const usernameInput = document.getElementbyId('username')
    // value: usernameInput.value

    // States are immutable
    // formData.username = value
    setFormData({ ...formData, [name]: value });
    // setFormData(
    // {
    //     username: "fern",
    //      age: 220
    // });

    // Spreader ...value
    // setFormData({ ...formData, username: 'fern' });
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
                // let usernameInput = document.getElementbyId('username')
                // console.log(usernameInput.value)
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
