import logoImg from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full  flex justify-center mb-8 flex-col">
      <img className="w-32 h-32 m-auto" src={logoImg} alt="Paw" />
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-orange-500">
        GROWLER
      </h1>
      <p className="text-l font-bold text-cyan-900 text-center mb-4 m-0 p-0">
        Create your personal collection of wildlife you would like to see.
      </p>
    </header>
  );
}
