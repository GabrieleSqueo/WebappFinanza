"use client"
import { useEffect, useState } from "react";

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
    <div>
      <h1>User Transactions</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
};

export default Graphs;
