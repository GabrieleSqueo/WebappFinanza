"use client"
import { useEffect, useState } from "react";
import LineCharts from "./linecharts";
import BarCharts from "./barcharts";


const Graphs = ({ userId }) => {
  const [transactions, setTransactions] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log('Fetching transactions for user:', userId);
        
        const res = await fetch(`/api/getTransactions?user_id=${userId}`, {
          method: "GET"
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }
        
        const text = await res.text();
        console.log('Raw response:', text);
        const data = text ? JSON.parse(text) : [];
        setTransactions(data);
        

      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    } else {
      console.log('No userId provided');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="min-h-72 flex flex-col">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight mb-3 sm:mb-6 mx-auto">Transazioni utente</h1>
      
      {transactions && transactions.length >0 ?
        <div className="flex flex-col gap-4">
            <LineCharts transactions={transactions}/>
            <BarCharts transactions={transactions}/>
        </div>  
      : <p className="mx-auto">Non hai ancora inserito transazioni</p>
      }
      
    </div>
  );
};

export default Graphs;
