import React from 'react'

const AboutUs = () => {
  return (
    <div className='flex flex-row my-4'>
        <div className='w-1/2'>
            <p></p>
        </div>
        <div className='w-1/2 p-4 py-2'>
        <h1 className='text-3xl font-extrabold text-transparent bg-clip-text text-[#a9d6e5] py-1 italic'>La Nostra Storia</h1>
            <div className='text-white text-lg'>
                Ehilà! Siamo Gabriele, Sara e Costantina, studenti universitari pugliesi. 
                <br/>Abbaimo deciso di unirci per lavorare su un progetto innovativo che unisce tecnologia e creatività. 
                <p className='py-1'><br/>Io, Costantina sono appassionata di arte, mi occupo della grafica. Il mio obiettivo è rendere l’interfaccia del nostro progetto visivamente accattivante e intuitiva.</p>
                <p className='my-1'><br/>Gabriele, sono esperto di sviluppo software, mi occupo dello scheletro e del software, assicurandomi che il progetto sia sempre funzionale e ben strutturato. 
                </p><p className='my-1'><br/>Infine, Sara si concentra sul design e sull'esperienza utente,lavorando per rendere il nostro progetto non solo funzionale ma anche piacevole da utilizzare, garantendo semplicità e accessibilità.
                </p><br/>Lavorando insieme, abbiamo deciso di sviluppare un’applicazione che semplifichi la gestione delle finanze personali, rendendola accessibile e intuitiva per tutti. Ognuno di noi porta il proprio contributo unico al progetto, e la nostra collaborazione è ciò che ci permette di affrontare le sfide e superarle con successo. Siamo convinti che, combinando le nostre competenze, possiamo creare qualcosa di veramente utile e innovativo.
            </div>
        </div>
    </div>
  )
}

export default AboutUs