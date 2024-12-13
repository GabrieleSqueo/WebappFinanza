import React from 'react'
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png"
import favicon from "../public/images/favicon.png"
import { Shrikhand } from 'next/font/google';


const shrikhand = Shrikhand({ subsets: ['latin'], weight: ["400"] })

const Navbar = () => {
  return  (
    <header className="w-full py-2 px-4 flex flex-row gap-2 justify-between shadow-lg bg-gradient-to-r from-sky-600 to-70% to-indigo-700">
        
        <Link href="/" className="my-auto text-white text-lg font-bold flex flex-row"> 
            <p className={`text-white italic text-5xl  ${shrikhand.className}`}>Gestione360</p>
        </Link >
        
        <div className="flex flex-row gap-2 ">
          <Link href="/login" className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800">
            <svg  className="h-4 my-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>
              Login
          </Link>
            <Link href="/signin" className="my-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800">
            <svg  className="h-4 my-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>
              Iscriviti
          </Link>
        
        </div>
      </header>
  )
}

export default Navbar