"use client"
import {useEffect, useState, React} from 'react'
import Graphs from './components/graphs'
import Link from 'next/link'
import Transactions from './components/transactions'
import { createClient } from "@supabase/supabase-js";
import {useRouter} from 'next/navigation'
import Navbar from './components/navbar'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Latest = () => {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [transactions, setTransactions] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login"); // Redirect to login if not logged in
        return;
      }
      setData(user)
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!data || !data.id) return;

      try {
        console.log('Fetching transactions for user:', data.id);
        
        const res = await fetch(`/api/getTransactions?user_id=${data.id}`, {
          method: "GET"
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }
        
        const text = await res.text();
        const transactionData = text ? JSON.parse(text) : [];
        setTransactions(transactionData);

      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [data]);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <main className='flex flex-col bg-gradient-to-r from-[#0077b6] to-blue-500 min-h-screen pb-10'>
      {data && <Navbar userId={data.id}/>}
      {transactions &&
        <>
          <Graphs transactions={transactions}/>
          <Transactions transactions={transactions}/>
        </>
      }
    </main>
  )
}

export default Latest