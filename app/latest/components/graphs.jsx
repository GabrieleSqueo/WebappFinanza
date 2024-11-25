"use client"
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="desc">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

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
    <div className="min-h-72">
      <h1 className="text-center text-5xl">Transazioni utente</h1>
      
      {transactions ?
        <div className="flex flex-col">
            <LineChart width={730} height={250} data={transactions.filter(item => item.type).sort((a,b) => a.date > b.date ?  1 : -1)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="amount"/>
              <Tooltip content={<CustomTooltip />}/>
              <Legend />
              <Line type="linear" dataKey="amount" stroke="green" strokeDasharray="5 2"/>
            </LineChart>
            <LineChart width={730} height={250} data={transactions.filter(item => !item.type)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="amount"/>
              <Tooltip content={<CustomTooltip />}/>
              <Legend />
              <Line type="linear" dataKey="amount" stroke="red" strokeDasharray="5 2"/>
            </LineChart>
          </div>
      : <p>Loading</p>
      }
      
    </div>
  );
};

export default Graphs;
