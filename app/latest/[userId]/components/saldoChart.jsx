"use client";

import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceChart = ({ transactions }) => {
  // Process transactions to calculate cumulative balance over time
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    let cumulativeBalance = 0;
    let savingsBalance = 0;

    // Sort transactions by date (ascending)
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Map to chart data format
    return sortedTransactions.map((transaction) => {
      // Calcola l'importo in base al tipo di transazione
      const amount = transaction.type ? transaction.amount : -transaction.amount;
      
      // Se è una transazione del salvadanaio (categoria 6)
      if (transaction.category === 6) {
        savingsBalance += amount;
        cumulativeBalance -= amount;
      } else {
        cumulativeBalance += amount;
      }

      return {
        date: new Date(transaction.date).toLocaleDateString(),
        balance: cumulativeBalance,
        savings: savingsBalance,
      };
    });
  }, [transactions]);

  return (
    <>
      <div className="w-full h-96 ">
        <h2 className="text-lg font-bold text-center mb-4">Saldo nel tempo</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" 
              tick={{ angle: -30, dx: -10, dy: 15 }} 
            />
            <YAxis tickFormatter={(value) => `${value} €`} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full h-96 ">
        <h2 className="text-lg font-bold text-center mb-4">Salvadanaio nel tempo</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" 
              tick={{ angle: -30, dx: -10, dy: 15 }} 
            />
            <YAxis tickFormatter={(value) => `${value} €`} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BalanceChart;
