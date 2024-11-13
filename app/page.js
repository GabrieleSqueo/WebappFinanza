import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="flex flex-col text-red-500">
      <Navbar />
      <Hero />
    </div>
  );
}
