import React from 'react'

const InfoUser = ({result, transactions}) => {
    // Verifica se result esiste e ha almeno 2 elementi
    if (!result || result.length < 2 || !transactions) {
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

    // Verifica se gli oggetti in result hanno le proprietà necessarie
    const lastEntry = result[result.length-1];
    const previousEntry = result[result.length-2];

    if (!lastEntry?.income || !lastEntry?.expenses || 
        !previousEntry?.income || !previousEntry?.expenses) {
        return (
            <div className='flex flex-row justify-between'>
                <div className='md:w-1/2'>
                    <div className='flex flex-col border-2 px-8 py-4 md:w-min bg-white rounded shadow-blue-600 shadow mx-auto my-4'>
                        <h1 className='mx-auto font-bold text-lg my-2'>Dati incompleti per mostrare le informazioni</h1>
                    </div>
                </div>
            </div>
        );
    }

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
    
    return (
        <div className='flex flex-row justify-between'>
            <div className='md:w-1/2'>
                <div className='flex flex-col px-8 py-4  md:w-min  mx-auto my-4 divide-y'>
                    <h1 className='mx-auto font-bold text-5xl text-white my-2 italic'>Infomazioni sul comportamento </h1>

                    <div className='w-full text-xl md:text-nowrap text-white py-4'>
                        <p> Cambiamento del saldo nell'ultimo mese: <span className='text-yellow-200'>{varLastMonth}€</span></p>
                        <p> Variazioni delle entrate rispetto al mese precedente: <span className='text-yellow-200'>{varEntrate}€</span></p>
                        <p> Variazioni delle spese rispetto al mese precedente: <span className='text-yellow-200'>{varSpese}€</span></p>
                        <p> Categoria in cui hai speso maggiormente: <span className='text-yellow-200'>{maxCategoryName} {maxCategory.amount}€</span></p>
                    </div>
                </div>
            </div>
            <div className='md:w-1/2'>
                <div className='flex flex-col px-8 py-4  md:w-min mx-auto m-4 divide-y'>
                    <h1 className='mx-auto font-bold text-5xl text-white my-2 italic' >Consigli sul comportamento </h1>
                    <div className='w-full text-xl md:text-nowrap text-white py-4'>
                        <p> </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoUser