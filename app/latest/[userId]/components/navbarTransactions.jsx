import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">MyFinanceBuddy</Link>
        </h1>
        <div>
          <Link
            href="/latest"
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Vai alla home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
