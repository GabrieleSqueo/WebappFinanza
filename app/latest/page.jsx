"use client"
import {useEffect, useState, React} from 'react'
import Graphs from './components/graphs'
import Link from 'next/link'
import Transactions from './components/transactions'
import { createClient } from "@supabase/supabase-js";
import {useRouter} from 'next/navigation'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Latest = () => {
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login"); // Redirect to login if not logged in
      }
      setData(user)
    };
    checkUser();
  }, []);

  return (
    <main className='bg-gray-100 min-h-screen'>
      <Graphs userId={data.id}/>
      <Transactions />
    </main>
    
    
  )
}

export default Latest