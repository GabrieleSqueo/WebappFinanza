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
        <div className='mx-auto flex flex-row'>
          <BarChart
              width={730}
              height={250}
              data={result}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="green" activeBar={<Rectangle fill="green" stroke="black" />} />
              <Bar dataKey="expenses" fill="red" activeBar={<Rectangle fill="red" stroke="black" />} />
            </BarChart>
            
          <div className='flex flex-col border p-4 w-1/2'>
            <h1 className='mx-auto'>Infomazioni sul comportamento </h1>
            {result &&
              <div>
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