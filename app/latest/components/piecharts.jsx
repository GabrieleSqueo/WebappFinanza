"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PieCharts = ({ transactions }) => {
  // Define colors for the pie chart
  const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"
  ];

  // Process transactions to calculate category-wise contributions
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const categoryTotals = transactions
      .filter((transaction) => transaction.type === false)
      .reduce((acc, transaction) => {
        const category = transaction.category || 'null';
        acc[category] = (acc[category] || 0) + parseFloat(transaction.amount);
        return acc;
      }, {});

    const totalEarnings = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

    // Creiamo un array di oggetti con il formato richiesto
    const chartData = [
      { name: "Alimenti", value: categoryTotals["1"] || 0 },
      { name: "Famiglia", value: categoryTotals["2"] || 0 },
      { name: "Vestiti", value: categoryTotals["3"] || 0 },
      { name: "Svago", value: categoryTotals["4"] || 0 },
      { name: "Istruzione", value: categoryTotals["5"] || 0 },
      { name: "Nessuna", value: categoryTotals["null"] || 0 }
    ].filter(item => item.value > 0);

    // Calcoliamo le percentuali
    return chartData.map(item => ({
      ...item,
      value: parseFloat(((item.value / totalEarnings) * 100).toFixed(2)),
      rawAmount: item.value
    }));
  }, [transactions]);
  
  return (
    <div className="flex flex-col w-full h-96">
      <h2 className="text-lg font-bold text-center mb-4b text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mx-auto">
        Spese per categoria
      </h2>
      <div className="mx-auto w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%" >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => `${props.payload.rawAmount} €`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieCharts;