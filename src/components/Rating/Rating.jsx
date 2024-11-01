import { AnimalsContext } from "../../store/animals-context";
import { useContext } from "react";

export default function Rating({ id, rating }) {
  const { updateFavorite } = useContext(AnimalsContext);

  const ratingBtnStyle =
    "cursor-pointer text-base w-6 h-6 rounded-full bg-cyan-900 text-yellow-500 flex justify-center items-center";

  return (
    <div className="flex gap-4 pt-3 items-center absolute bg-yellow-500 rounded p-1 right-3 top-3 ">
      <p className="text-xs absolute top-0 left-8">rating</p>
      <button
        className={ratingBtnStyle}
        onClick={() => updateFavorite(id, -1)}
      >
        -
      </button>
      <span>{ rating || 0}</span>
      <button
        className={ratingBtnStyle}
        onClick={() => updateFavorite(id, 1)}
      >
        +
      </button>
    </div>
  );
}
