import Link from "next/link";
import { Shrikhand } from 'next/font/google';


const shrikhand = Shrikhand({ subsets: ['latin'], weight: ["400"] })


const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#0077b6] to-blue-500 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="my-auto text-white text-lg font-bold flex flex-row"> 
            <p className={`text-white italic text-5xl  ${shrikhand.className}`}>Gestione360</p>
        </Link >
        <div>
          <Link href="/latest" className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800">
              Homepage
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
