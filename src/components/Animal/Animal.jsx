import { FaHeart } from "react-icons/fa";
import { AnimalsContext } from "../../store/animals-context";
import { useContext } from "react";

export default function Animal({ animal }) {
  const { selectAnimal } = useContext(AnimalsContext);

  const heartStyle = `text-3xl absolute bottom-2 right-3 ${animal.isFavorite ? 'text-rose-600' : 'text-white'}`
  
  return (
    <li key={animal.name} className="relative flex flex-col shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] animate-[slide-up-fade-in_0.3s_ease-out_forwards] rounded-lg">
      <button onClick={() => selectAnimal(animal)}>
        <img className="w-full h-full object-cover rounded-lg" src="https://loremflickr.com/320/240" alt={animal.name} />
        <h1 className="text-lg absolute bg-yellow-300 rounded mx-auto my-4 px-2 py-2 left-4 top-0">{animal.name}</h1>
        <h3 className="text-lg absolute bg-yellow-200 rounded mx-auto my-4 px-1 py-1 left-4 bottom-0">{animal.locations[0]}</h3>
        <FaHeart className={heartStyle}/>
      </button>
    </li>
  );
}
