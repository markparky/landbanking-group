import { createContext, useReducer, useState } from "react";
import { Action, animalsReducer } from "./animals-reducer";

export const AnimalsContext = createContext({
  animals: [],
  favorites: [],
  setSearchAnimals: () => {},
  selectAnimal: () => {},
  updateAnimal: () => {},
});

export default function AnimalsContextProvider({ children }) {
  const [animalsState, animalsDispatch] = useReducer(animalsReducer, {
    animals: [],
    favorites: [],
  });

  function addToFavorites(favAnimal) {
    animalsDispatch({
      type: Action.AddFavorite,
      payload: favAnimal,
    });
  }

  function removeFromFavorites(favAnimal) {
    animalsDispatch({
      type: Action.RemoveFavorite,
      payload: favAnimal,
    });
  }

  function handleSelectAnimal(animal) {
    animal.isFavorite ? removeFromFavorites(animal) : addToFavorites(animal);
  }

  function setSearchAnimals(animals) {
    animalsDispatch({
      type: Action.UpdateAnimals,
      payload: animals,
    });
  }

  function updateFavorite(animalName, amount) {
    animalsDispatch({
      type: Action.UpdateFavorite,
      payload: { id: animalName, amount },
    });
  }

  const animalCtx = {
    animals: animalsState.animals,
    favorites: animalsState.favorites,
    setSearchAnimals: setSearchAnimals,
    selectAnimal: handleSelectAnimal,
    updateFavorite: updateFavorite,
  };

  return (
    <AnimalsContext.Provider value={animalCtx}>
      {children}
    </AnimalsContext.Provider>
  );
}
