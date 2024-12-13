import React from 'react'
import Image from 'next/image'
import descimg from "../public/images/budget.svg"
import graphs from "../public/images/graphs.svg"
import analysis from "../public/images/analysis.svg"
import people from "../public/images/people.svg"
const Description = () => {
  return (
    <div className='flex flex-col my-8'>
        <div className='flex flex-col  p-4 rounded-lg '>
            <h1 className='mx-auto font-extrabold text-3xl italic text-[#a9d6e5]  py-2 2'>A cosa serve Gestione360?</h1>
            <div className='text-lg text-white mx-auto'>
                <li> È una piattaforma intuitiva e personalizzata che consente agli utenti di gestire in modo efficiente le proprie finanze.</li>

                <li>    Tiene traccia di spese e entrate. </li>

                <li>    Offre strumenti avanzati per pianificare budget personalizzati  </li>

                <li>    Analizza il comportamento finanziario, con l'obiettivo di migliorare la salute economica individuale.</li>
            </div>
            
        </div>
        <div className='flex flex-row justify-center my-12'>
            <div className='flex flex-col w-1/4'>
                <Image src={descimg} className='h-24 px-auto'/>
                <p className='text-white text-xl mx-auto text-balance py-2 italic'>Budget Personalizzati con AI</p>
            </div>
            <div className='flex flex-col w-1/4'>
                <Image src={graphs} className='h-24 px-auto'/>
                <p className='text-white text-xl mx-auto text-balance py-2 italic'>Grafici interattivi e predittivi</p>
            </div>
            <div className='flex flex-col w-1/4'> 
                <Image src={analysis} className='h-24 px-auto'/>
                <p className='text-white text-xl mx-auto  py-2 italic'>Analisi del comportamento </p>
            </div>
            <div className='flex flex-col w-1/4'>
                <Image src={people} className='h-24 px-auto'/>
                <p className='text-white text-xl mx-auto text-balance py-2 italic'>Integrazione multi_account</p>
            </div>
        </div>
    </div>
  )
}

export default Description