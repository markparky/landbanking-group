import { useState, useEffect, useContext } from "react";
import { AVAILABLE_ANIMALS } from "../data";
import { AnimalsContext } from "../store/Animals-Context";

export default function Search({
  title,
  fallbackText,
}) {

  const { animals, selectAnimal } = useContext(AnimalsContext);

  return (
    <section className="places-category">
      <h2>{title}</h2>
      {animals.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {animals.length > 0 && (
        <ul className="places">
          {animals.map((animal) => (
            <li key={animal.name} className="place-item">
              <button onClick={() => selectAnimal(animal.name)}>
                <img src="https://loremflickr.com/320/240" alt={animal.name} />
                <h1>{animal.name}</h1>
                <h3>{animal.locations[0]}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
