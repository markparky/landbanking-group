import { storageKey } from "./animals-context";

export const Action = {
  AddFavorite: "ADD_FAVORTIE",
  RemoveFavorite: "REMOVE_FAVORTIE",
  UpdateFavorite: "UPDATE_FAVORITE",
  UpdateAnimals: "UPDATE_ANIMALS",
};

export function animalsReducer(state, action) {
  switch (action.type) {
    case Action.AddFavorite: {
      const updatedFavorites = [...state.favorites];
      const updatedAnimals = [...state.animals];

      if (
        !updatedFavorites.some((animal) => animal.name === action.payload.name)
      ) {
        updatedFavorites.push({
          ...action.payload,
          isFavorite: true,
          rating: 0,
        });
      }

      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));

      return {
        ...state,
        animals: updatedAnimals.filter(
          (animal) => animal.name !== action.payload.name
        ),
        favorites: updatedFavorites,
      };
    }
    case Action.UpdateAnimals: {
      return { ...state, animals: action.payload };
    }
    case Action.RemoveFavorite: {
      const updatedFavorites = [...state.favorites].filter(
        (animal) => animal.name !== action.payload.name
      );

      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    case Action.UpdateFavorite: {
      const updatedFavorites = [...state.favorites];

      const updatedFavoritesIndex = updatedFavorites.findIndex(
        (animal) => animal.name === action.payload.id
      );

      updatedFavorites[updatedFavoritesIndex].rating += action.payload.amount;

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }

    default: {
      throw Error(`Unknown Action ${action.type}`);
    }
  }
}
