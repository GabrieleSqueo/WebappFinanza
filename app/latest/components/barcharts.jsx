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
    
    return (
        <div className='mx-auto'>
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
        </div>
    )
}

export default BarCharts