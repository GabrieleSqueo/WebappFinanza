"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Shrikhand } from 'next/font/google';

const shrikhand = Shrikhand({ subsets: ['latin'], weight: ["400"] })

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
        <nav className={`text-white py-4 shadow-lg ${isMenuOpen ? "shadow": ""}`}>
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <div className="hidden md:flex justify-between items-center">
                <Link href="/" className="my-auto text-white text-lg font-bold flex flex-row"> 
                    <p className={`text-white italic text-5xl  ${shrikhand.className}`}>Gestione360</p>
                </Link >
                    <div className="flex space-x-4">
                        {userId ? (
                            <>
                                <Link href="/latest/predizioni" className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800"> 
                                    Predizioni
                                </Link>
                                <Link href={`./latest/${userId}`} className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800"> 
                                    Transazioni
                                </Link>
                            </>
                        ) : (
                            <span className="loading loading-spinner loading-md"></span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800"
                        >
                            <svg  className="h-4 my-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>
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
