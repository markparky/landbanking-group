import Animal from "../Animal/Animal";
import { AnimalsContext } from "../../store/animals-context";
import { useContext } from "react";

export default function Favorites() {
  const { favorites } = useContext(AnimalsContext);

  return (
    <section className="max-w-7xl mb-10 mx-auto p-4 rounded-lg border-2 border-solid border-cyan-900">
      <h2 className="text-3xl font-bold text-cyan-900 text-center mb-4">
        Favorites
      </h2>
      {favorites.length === 0 && (
        <p className="text-2xl text-cyan-900 text-center mb-4 m-0 p-0">
          Find your beasties here
        </p>
      )}
      {favorites.length > 0 && (
        <ul className="mt-16 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          {favorites.map((animal, index) => (
            <Animal key={index} animal={animal} />
          ))}
        </ul>
      )}
    </section>
  );
}
