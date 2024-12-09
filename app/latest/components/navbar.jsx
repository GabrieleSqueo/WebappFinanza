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
        <nav className="text-blue-500  p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl text-blue-700 font-bold my-auto">Gestione360 </Link>
            <div className="flex space-x-4">
            {userId ?
                <Link href={`./latest/${userId}`} className="text-xl hover:text-blue-700 font-bold my-auto">Transazioni</Link> :
                <span className="loading loading-spinner loading-md"></span>
            }
            <button
                onClick={handleLogout}
                className="text-xl font-bold px-4 py-2 rounded hover:text-blue-700 hover:underline  my-auto"
            >
                Logout
            </button>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
