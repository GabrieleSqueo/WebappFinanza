import React from 'react'
import Image from 'next/image'
import heroimg from "../public/images/heroimg.png"
import { Shrikhand } from 'next/font/google'
import Link from 'next/link'

const shrikhand = Shrikhand({ subsets: ['latin'], weight: ["400"] })

const Hero = () => {
  return (
    <div className="flex flex-row items-center mx-auto flex-1  ">
      <div className='flex flex-col mx-auto w-1/2 pl-8 '>
        <h2 className=" text-white text-6xl font-extrabold ">
          Vuoi gestire al meglio le tue finanze?
        </h2>
        <p className="mt-2 text-4xl  max-w-lg italic font-bold text-white underline decoration-[#61a5c2]">
          Scegli <span className= {`text-[#a9d6e5] italic  ${shrikhand.className}`}> Gestione360! </span>
        </p>
        <Link href="/signin" className=" text-xl flex flex-row rounded gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-9 py-3 my-4 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800">
          <svg  className="h-4 my-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>
            Iscriviti
        </Link>
      </div>
      <div className='mx-auto w-1/2'>
        <Image src={heroimg} />
      
      </div>
        

        
    </div>
  )
}

export default Hero