import {React, useState} from 'react'
import {BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts"
import PieCharts from './piecharts';
import InfoUser from './infouser';

function sumAmountsByMonth(transactions) {
    const sumsByMonth = {};
    
    if (transactions.length <0 ) {
      return []
    }

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
    
    
    return (
      <section>
        <div className='flex flex-col md:flex-row gap-2 w-full justify-stretch mx-auto'>
          <div className="w-full h-72 m-4">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={result}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 15,
                }}
                className='bg-white shadow-blue-500 shadow rounded'
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Entrate" dataKey="income" fill="green" activeBar={<Rectangle fill="green" stroke="black" />} barSize={40}/>
                <Bar name="Spese" dataKey="expenses" fill="red" activeBar={<Rectangle fill="red" stroke="black" />} barSize={40}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          
        </div>
        {transactions.filter(item => item.type).length >0 && transactions.filter(item => !item.type).length >0  && result.length>0 ?
        <>
          <PieCharts transactions={transactions}/>
          <InfoUser result={result} transactions={transactions}/>
          </>:
        <></>
        }
        </section>
    )
}

export default BarCharts