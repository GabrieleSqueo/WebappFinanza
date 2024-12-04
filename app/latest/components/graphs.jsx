"use client"
import { useEffect, useState } from "react";
import LineCharts from "./linecharts";
import BarCharts from "./barcharts";


const Graphs = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
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

  if (loading) return <span className="flex flex-col text-center text-5xl py-10 italic underline mx-auto">Attendi un secondo...</span>;

  return (
    <div className="min-h-72">
      <h1 className="text-center text-5xl py-4">Transazioni utente</h1>
      
      {transactions && transactions.length>0 ?
        <div className="flex flex-col mx-auto">
            <LineCharts transactions={transactions}/>
            <BarCharts transactions={transactions}/>
        </div>  
      : !loading && <h1 className="text-center text-5xl py-10 italic underline"> Inserisci qua sotto la tua prima transazione</h1>
      }
      
    </div>
  );
};

export default Graphs;
