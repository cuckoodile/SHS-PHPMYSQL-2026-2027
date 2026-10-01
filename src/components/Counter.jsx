import { useState } from "react";

// Our component standard name is title case.
export default function Counter() {
  const [isVisible, setVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  function handleNegativeCount() {
    // if (counter == 0) {
    //   return;
    // } else {
    //   setCounter(counter - 1);
    // }

    // Ternary
    counter == 0 ? null : setCounter(counter - 1);

    /* Shortcut Operators
      Ternary Operator: short hand single if statement.

      Syntax:
      condition ? (if true) : (if false)

      counter == 0 ? null : setCounter(counter - 1)

      Conditional Rendering: Our display is base on a condition.

      Logical AND Operator
      Syntax:
      value && (code block)
    */
  }

  function handleCounterVisibility() {
    setVisible(!isVisible);
    // true ==> false   and vice-versa

    if (isVisible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  return (
    <div className="flex flex-col gap-7">
      {isVisible && (
        <section className="border p-4 rounded-2xl">
          <h1>Count: {counter}</h1>
          <div className="flex gap-5">
            <button
              onClick={() => setCounter(counter + 1)}
              className="bg-green-800 border-3 border-green-600"
            >
              +
            </button>
            <button
              onClick={handleNegativeCount}
              className="bg-red-800 border-3 border-red-600"
            >
              -
            </button>
          </div>
        </section>
      )}
      <button onClick={handleCounterVisibility} className="border">
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
