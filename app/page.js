import Link from "next/link";
import Image from "next/image";
import logo from "./public/images/logo.png"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 py-2 flex flex-row">
        <Image src={logo} width={50} height={50} alt="logo" className="ml-4"/>
        <Link href="/" className="text-white text-lg font-bold my-auto mx-auto flex flex-row justify-center">
            <p className="text-5xl italic">Gestione360</p>
        </Link >
      </header>

      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Take Control of Your Finances
        </h2>
        <p className="mt-4 text-gray-600 max-w-lg">
          MyFinanceBuddy helps you manage your personal finances with ease. 
          Track your income, expenses, and budgets all in one place, so you 
          can focus on achieving your financial goals.
        </p>

        <div className="flex mt-8 space-x-4">
          <Link href="/login" className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
          </Link>
          <Link href="/signin" className="px-6 py-3 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign Up
          </Link>
        </div>
      </div>

      <footer className="w-full py-4 bg-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Sara Renzullo, Gabriele Squeo, Costantina Pesce
        </p>
      </footer>
    </div>
  );
};

export default Home;