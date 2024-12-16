
import Hero from "./components/hero"
import Navbar from "./components/navbar";
import Description from "./components/description";
import AboutUs from "./components/aboutus.jsx"
import Footer from "./components/footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-sky-700 to-70% to-indigo-800">
      <Navbar />

      <Hero />
      <Description />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;