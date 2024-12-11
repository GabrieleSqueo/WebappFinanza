"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Navbar = ({ userId }) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            router.push("/login");
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };

    return (
        <nav className={`text-blue-500 p-4 ${isMenuOpen ? "shadow": ""}`}>
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <div className="hidden md:flex justify-between items-center">
                    <Link href="/" className=" italic text-3xl text-blue-700 font-bold">
                        Gestione360
                    </Link>
                    <div className="flex space-x-4">
                        {userId ? (
                            <>
                                <Link href={`./latest/predizioni`} className="text-xl hover:text-blue-700 font-bold my-auto">
                                    Predizioni
                                </Link>
                                <Link href={`./latest/${userId}`} className="text-xl hover:text-blue-700 font-bold my-auto">
                                    Transazioni
                                </Link>
                            </>
                        ) : (
                            <span className="loading loading-spinner loading-md"></span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-xl font-bold py-2 rounded hover:text-blue-700 hover:underline my-auto"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex justify-between items-center">
                    <Link href="/" className="text-xl text-blue-700 font-bold">
                        Gestione360
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-blue-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 flex flex-col space-y-4 ">
                        {userId ? (
                            <>
                                <Link href={`./latest/${userId}`} className="text-xl hover:text-blue-700 font-bold justify-start">
                                    Transazioni
                                </Link>
                                <Link href={`./latest/predizioni`} className="text-xl hover:text-blue-700 font-bold justify-start">
                                    Predizioni
                                </Link>
                            </>
                        ) : (
                            <span className="loading loading-spinner loading-md"></span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-xl font-bold rounded hover:text-blue-700 hover:underline text-left justify-start"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
