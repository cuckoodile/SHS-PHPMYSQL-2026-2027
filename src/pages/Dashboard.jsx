import { useOutletContext } from "react-router";

import Gallery from "../components/Gallery";
import FormPopup from "../components/FormPopup";

export default function Dashboard() {
  const { pokemons, createPokemon, isFormVisible, setFormVisible } =
    useOutletContext();

  return (
    <div>
      <Gallery pokemons={pokemons} />

      {isFormVisible && (
        <FormPopup
          createPokemon={createPokemon}
          setFormVisible={setFormVisible}
        />
      )}
    </div>
  );
}
