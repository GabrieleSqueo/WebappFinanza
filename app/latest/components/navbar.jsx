"use client";

import React from "react";
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

    const handleLogout = async () => {
        try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        router.push("/login"); // Redirect to login page
        } catch (error) {
        console.error("Error during logout:", error.message);
        }
    };

    return (
        <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-lg font-bold my-auto">MyFinanceBuddy </Link>
            <div className="flex space-x-4">
            {userId ?
                <Link href={`./latest/${userId}`} className="text-white hover:underline my-auto">Transazioni</Link> :
                <span className="loading loading-spinner loading-md"></span>
            }
            <button
                onClick={handleLogout}
                className=" text-white px-4 py-2 rounded hover:underline  my-auto"
            >
                Logout
            </button>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
