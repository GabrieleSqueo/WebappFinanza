
import Hero from "./components/hero"
import Navbar from "./components/navbar";
import Description from "./components/description";
import AboutUs from "./components/aboutus.jsx"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-sky-700 to-70% to-indigo-800">
      <Navbar />

      <Hero />
      <Description />
      <AboutUs />
      <footer className="w-full py-4  bg-gradient-to-r from-sky-600 to-70% to-indigo-700">
        <p className="text-sm text-white text-center">
          Sara Renzullo, Gabriele Squeo, Costantina Pesce
        </p>
      </footer>
    </div>
  );
};

export default Home;