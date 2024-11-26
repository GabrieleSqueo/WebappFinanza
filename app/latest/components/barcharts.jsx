import {React, useState} from 'react'
import {BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts"

function sumAmountsByMonth(transactions) {
    // Create a map to store sums by month
    const sumsByMonth = {};
  
    transactions.filter(item => item.type).forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2024-11"
  
      // Add the amount to the corresponding month
      if (!sumsByMonth[monthYear]) {
        sumsByMonth[monthYear] = 0;
      }
      sumsByMonth[monthYear] += transaction.amount;
    });
    return Object.entries(sumsByMonth).map(([month, total]) => ({
        month,
        total,
    })).sort((a,b) => a.date > b.date ?  1 : -1);
}

const BarCharts = ({transactions}) => {
    const result = sumAmountsByMonth(transactions);
    

    console.log(result)
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
              <YAxis dataKey="total"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="green" activeBar={<Rectangle fill="green" stroke="black" />} />
            </BarChart>
        </div>
    )
}

export default BarCharts