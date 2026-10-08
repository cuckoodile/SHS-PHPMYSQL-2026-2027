import React, { useState } from "react";

export default function FormUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    gender: "",
  });

  function handleSubmit() {
    alert("Hello world!");
  }

  //   DRY Principle
  // Don't Repeat Yourself...

  function handleInputChange(e) {
    // Destructuring..
    const { name, value } = e.target;

    /*
        e.target = {
            name: 
        }
    */

    setFormData({ ...formData, [name]: value });

    /*
        formData = {
            id: 1,
            first_name: 'ian',
            last_name: 'sube',
            age: 99,
            gender: 'm'
        }

        newData = {
            id: 1,
            first_name: 'Frieren'
            last_name: 'sube',
            age: 99,
            gender: 'm',
        }
    */
  }

  return (
    <form onSubmit={handleSubmit} className="border-3 p-5 rounded-lg">
      {/* First Name Field */}
      <div>
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
      </div>

      {/* Last Name Field */}
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
      </div>

      {/* Age Field */}
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
      </div>

      {/* Gender Field */}
      <div>
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
      </div>

      {/* Action Field */}
      <div>
        <button>Create</button>
      </div>
    </form>
  );
}
