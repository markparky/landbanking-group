import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import "./App.css";
import Animals from "./components/Animals/Animals";

const options = {
  method: "GET",
  headers: { "x-api-key": "5oO8ABJ4BAYYnfjb1BhBDA==JuwALhZExV7jSzU0" },
};

const App = () => {
  const searchQuery = useRef();
  const [enteredSearchQuery, setEnteredSearchQuery] = useState("");

  const fetchData = async () => {
    if (enteredSearchQuery.length > 0) {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${enteredSearchQuery}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } else {
      return [];
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [enteredSearchQuery],
    queryFn: fetchData,
    cacheTime: 60000,
    staleTime: 30000,
    refetchInterval: 120000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  function handleClick() {
    setEnteredSearchQuery(searchQuery.current.value);
    searchQuery.current.value = "";
  }

  return (
    <>
      <div className="w-full min-w-[200px] flex justify-center mb-8">
        <div className="relative">
          <input
            ref={searchQuery}
            className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Find your wildlife..."
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleClick}
          >
            <FaSearch id="search-icon" />
            Search
          </button>
        </div>
      </div>
      <div>
        <Animals animals={data} />
      </div>
    </>
  );
};

export default App;
