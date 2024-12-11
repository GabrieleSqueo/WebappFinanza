import React from 'react'

const InfoUser = ({result, transactions}) => {
    const varLastMonth = result[result.length-1].income - result[result.length-1].expenses;
    const varEntrate = result[result.length-1].income - result[result.length-2].income;
    const varSpese = result[result.length-1].expenses - result[result.length-2].expenses;
    const saldo = transactions.reduce((sum, transaction) => sum += transaction.amount, 0);
    console.log(saldo)
    
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
                <div className='flex flex-col border-2 px-8 py-4  md:w-min bg-white rounded shadow-blue-600 shadow mx-auto my-4'>
                    <h1 className='mx-auto font-bold text-lg my-2 '>Infomazioni sul comportamento </h1>
                    {result &&
                    <div className='w-full  md:text-nowrap'>
                        <p> Cambiamento del saldo nell'ultimo mese: {varLastMonth}€</p>
                        <p> Variazioni delle entrate rispetto al mese precedente: {varEntrate}€</p>
                        <p> Variazioni delle spese rispetto al mese precedente: {varSpese}€</p>
                        <p> Categoria in cui hai speso maggiormente: {maxCategoryName} {maxCategory.amount}€</p>
                        <p > Saldo: <span className={`${saldo >0? "text-green-600" :"text-red-400"}`}>{saldo }€</span> </p>
                    </div>
                    }
                </div>
            </div>
            <div className='md:w-1/2'>
                <div className='flex flex-col border-2 px-8 py-4  md:w-min bg-white rounded shadow-blue-600 shadow mx-auto m-4'>
                    <h1 className='mx-auto font-bold text-lg my-2 md:text-nowrap'>Consigli sul comportamento </h1>

                </div>
            </div>
            
        </div>
    )
}

export default InfoUser