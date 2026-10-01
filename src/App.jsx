// Packages and Files
import React, { useState } from "react";

// Components
import Counter from "./components/Counter";
import Card from "./components/Card";
import FormUser from "./components/FormUser";
import ContainerUser from "./components/ContainerUser";

export default function App() {
  /* React Hooks
  useState
  Syntax:
      import React, { useState } from "react";

      const [getter, setter] = useState(defaultValue)
      const [getter, setter] = React.useState(defaultValue)
      
      const [counter, setCounter] = useState(0)

      let counter = 0

      DOM Manipulation
      const div = document.getElementbyId('container-div')

      const paragraph = document.createElement(p)
      paragraph.innerText = "This is a container"

      div.append(paragraph)


    useEffect

    useRef
  */

  

  return (
    <div className="min-h-screen bg-slate-900 text-white text-6xl p-5 flex flex-col items-center gap-8">
      {/* <Counter /> */}

      <ContainerUser />

      {/* More components... */}
    </div>
  );
}
