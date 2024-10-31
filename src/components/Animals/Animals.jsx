import Animal from "../Animal/Animal";

export default function Animals({ animals }) {

  return (
    <section className="max-w-7xl mx-auto p-4 rounded-lg border-2 border-solid border-cyan-900">
      <h2 className="text-3xl font-bold text-cyan-900 text-center mb-4 m-0 p-0">Search Results</h2>
      {animals.length === 0 && (
        <p className="text-2xl text-cyan-900 text-center mb-4 m-0 p-0">Start by searching</p>
      )}
      {animals.length > 0 && (
        <ul className="mt-16 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          {animals.map((animal, index) => (
            <Animal key={index} animal={animal} />
          ))}
        </ul>
      )}
    </section>
  );
}
