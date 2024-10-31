import Animals from "./components/Animals/Animals";
import Favorites from "./components/Favorites/Favorites";
import Header from "./components/Header/Header";
import AnimalsContextProvider from "./store/animals-context";

import "./App.css";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <>
      <Header />
      <AnimalsContextProvider>
        <div className="w-full min-w-52 flex justify-center mb-8">
          <Search />
        </div>
        <div>
          <Favorites title="Favorites" />
          <Animals title="Search Results" />
        </div>
      </AnimalsContextProvider>
    </>
  );
};

export default App;
