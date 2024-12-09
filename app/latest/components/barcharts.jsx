import {React, useState} from 'react'
import {BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts"

function sumAmountsByMonth(transactions) {
    const sumsByMonth = {};
  
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  
      if (!sumsByMonth[monthYear]) {
        sumsByMonth[monthYear] = {
          income: 0,
          expenses: 0
        };
      }
      
      if (transaction.type) {
        sumsByMonth[monthYear].income += transaction.amount;
      } else {
        sumsByMonth[monthYear].expenses += transaction.amount;
      }
    });
    
    return Object.entries(sumsByMonth).map(([month, values]) => ({
        month,
        income: values.income,
        expenses: values.expenses
    })).sort((a, b) => {
        const [yearA, monthA] = a.month.split('-');
        const [yearB, monthB] = b.month.split('-');
        return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });
}

const BarCharts = ({transactions}) => {
    const result = sumAmountsByMonth(transactions);
    console.log(result[result.length-1])
    const varLastMonth = result[result.length-1].income- result[result.length-1].expenses;
    const varEntrate = result[result.length-1].income - result[result.length-2].income
    const varSpese = result[result.length-1].expenses - result[result.length-2].expenses
    
    return (
        <div className='flex flex-col md:flex-row gap-2 justify-between'>
          <BarChart
              width={730}
              height={270}
              data={result}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 15,
              }}
              className='bg-white shadow-blue-500 shadow mx-auto rounded'
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar name="Entrate" dataKey="income" fill="green" activeBar={<Rectangle fill="green" stroke="black" />} barSize={40}/>
              <Bar name="Spese" dataKey="expenses" fill="red" activeBar={<Rectangle fill="red" stroke="black" />} barSize={40}/>
            </BarChart>
            
          <div className='flex flex-col border-2 p-4  w-1/2 bg-white rounded shadow-blue-600 shadow mx-auto '>
            <h1 className='mx-auto'>Infomazioni sul comportamento </h1>
            {result &&
              <div className=''>
                <p> Cambiamento del saldo nell'ultimo mese: {varLastMonth}€</p>
                <p> Variazioni delle entrate rispetto al mese precedente: {varEntrate}€</p>
                <p> Variazioni delle spese rispetto al mese precedente: {varSpese}€</p>
                <p> Categoria in cui hai speso maggiormente:</p>
              </div>
              
            }
          </div>
        </div>
    )
}

export default BarCharts