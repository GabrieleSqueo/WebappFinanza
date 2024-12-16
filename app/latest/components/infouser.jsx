import React from 'react'

const InfoUser = ({result, transactions}) => {
    // Verifica se result esiste e ha almeno 2 elementi
    if (!result || !transactions) {
        return (
            <div className='flex flex-row justify-between'>
                <div className='md:w-1/2'>
                    <div className='flex flex-col border-2 px-8 py-4 md:w-min bg-white rounded shadow-blue-600 shadow mx-auto my-4'>
                        <h1 className='mx-auto font-bold text-lg my-2'>Dati insufficienti per mostrare le informazioni</h1>
                    </div>
                </div>
            </div>
        );
    }

    // Inizializza i valori a 0
    const lastEntry = {
        income: result[result.length-1]?.income || 0,
        expenses: result[result.length-1]?.expenses || 0
    };
    
    const previousEntry = {
        income: result.length > 1 ? (result[result.length-2]?.income || 0) : 0,
        expenses: result.length > 1 ? (result[result.length-2]?.expenses || 0) : 0
    };

    const varLastMonth = lastEntry.income - lastEntry.expenses;
    const varEntrate = lastEntry.income - previousEntry.income;
    const varSpese = lastEntry.expenses - previousEntry.expenses;
    
    // Calcolo spese per categoria
    const categoryExpenses = transactions
        .filter(transaction => transaction.type === false && transaction.category)
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
            return acc;
        }, {});

    // Trova la categoria con la spesa maggiore
    const maxCategory = Object.entries(categoryExpenses)
        .reduce((max, [category, amount]) => {
            return amount > max.amount ? { category, amount } : max;
        }, { category: null, amount: 0 });

    // Converti il numero della categoria nel nome
    const categoryNames = {
        '1': 'Alimenti',
        '2': 'Famiglia',
        '3': 'Vestiti',
        '4': 'Svago',
        '5': 'Istruzione',
        'null': 'Nessuna'
    };
    
    const maxCategoryName = categoryNames[maxCategory.category] || 'Nessuna';
    
    // Calcola il totale dei trasferimenti al salvadanaio per questo mese
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const savingsThisMonth = transactions
        .filter(transaction => 
            transaction.category === 6 && 
            new Date(transaction.date).getMonth() === currentMonth &&
            new Date(transaction.date).getFullYear() === currentYear
        )
        .reduce((total, transaction) => total + transaction.amount, 0);

    const savingsLastMonth = transactions
        .filter(transaction => 
            transaction.category === 6 && 
            new Date(transaction.date).getMonth() === (currentMonth - 1) &&
            new Date(transaction.date).getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)
        )
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Genera consigli basati sul confronto
    const generateSavingsAdvice = () => {
        const difference = savingsThisMonth - savingsLastMonth;
        
        if (savingsThisMonth === 0) {
            return "Non hai ancora messo da parte risparmi questo mese. Prova a risparmiare anche una piccola somma!";
        }
        
        if (difference > 0) {
            return `Ottimo lavoro! Hai risparmiato ${difference.toFixed(2)}€ in più rispetto al mese scorso. Continua così!`;
        } else if (difference < 0) {
            return `Questo mese hai risparmiato ${Math.abs(difference).toFixed(2)}€ in meno rispetto al mese scorso. Prova ad aumentare i tuoi risparmi!`;
        } else {
            return `Hai mantenuto lo stesso livello di risparmio del mese scorso (${savingsThisMonth.toFixed(2)}€). Prova ad aumentarlo gradualmente!`;
        }
    };

    return (
        <div className='flex flex-row justify-between'>
            <div className='md:w-1/2'>
                <div className='flex flex-col px-8 py-4 md:w-min mx-auto my-4 divide-y'>
                    <h1 className='mx-auto font-bold text-5xl text-white my-2 italic'>Infomazioni sul comportamento </h1>

                    <div className='w-full text-xl md:text-nowrap text-white py-4'>
                        <p> Cambiamento del saldo nell'ultimo mese: <span className='text-yellow-200'>{varLastMonth}€</span></p>
                        <p> Variazioni delle entrate rispetto al mese precedente: <span className='text-yellow-200'>{varEntrate}€</span></p>
                        <p> Variazioni delle spese rispetto al mese precedente: <span className='text-yellow-200'>{varSpese}€</span></p>
                        <p> Categoria in cui hai speso maggiormente: <span className='text-yellow-200'>{maxCategoryName} {maxCategory.amount}€</span></p>
                        <p> Risparmi questo mese: <span className='text-yellow-200'>{savingsThisMonth.toFixed(2)}€</span></p>
                        <p> Risparmi mese scorso: <span className='text-yellow-200'>{savingsLastMonth.toFixed(2)}€</span></p>
                    </div>
                </div>
            </div>
            <div className='md:w-1/2'>
                <div className='flex flex-col px-8 py-4 md:w-auto mx-auto m-4 divide-y'>
                    <h1 className='mx-auto font-bold text-5xl text-white my-2 italic text-wrap'>Consigli sul comportamento </h1>
                    <div className='text-xl text-white py-4'>
                        <p className="mt-4 text-wrap">
                            <span className='text-yellow-200'>{generateSavingsAdvice()}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoUser