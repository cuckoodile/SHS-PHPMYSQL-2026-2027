import React from "react";

export default function FormUser() {
  return (
    <form>
      {/* First Name Field */}
      <div>
        <label htmlFor="">First Name</label>
        <input type="text" />
      </div>

      {/* Last Name Field */}
      <div>
        <label htmlFor="">Last Name</label>
        <input type="text" />
      </div>

      {/* Age Field */}
      <div>
        <label htmlFor="">Age</label>
        <input type="number" />
      </div>

      {/* Gender Field */}
      <div>
        <label htmlFor="">Gender</label>
        <select name="" id="">
          <option value="">Male</option>
          <option value="">Female</option>
        </select>
      </div>
    </form>
  );
}
