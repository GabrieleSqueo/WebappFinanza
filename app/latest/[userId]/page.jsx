"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/navbarTransactions";
import SaldoChart from "./components/saldoChart"
import Footer from "@/app/components/footer";

// Inizializza il client di Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const UserTransactions = () => {
  const pathname = usePathname();
  const userId  = pathname.split("/")[2];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  let saldo = 0;

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  const fetchTransactions = async () => {
    if (!userId) return;
    console.log("transactions")
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("userid", userId);

      if (error) throw error;
      console.log(data)
      setTransactions(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);

      if (error) throw error;

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== transactionId)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <>
    <div className=" mb-3">
      <Navbar />
      <div className="flex flex-col container mx-auto p-4 rounded  ">
      
      <h1 className="text-5xl italic font-bold mb-4 mx-auto text-blue-600">
        Transazioni
      </h1>

      {transactions.length === 0 ? (
        <p>No transactions found for this user.</p>
      ) : (
        <table className="min-w-full table-auto bg-white border shadow-lg shadow-blue-500  rounded ">
          <thead>
            <tr className="bg-[#def1f5]">
              <th className="px-4 py-2 border-b text-center ">Tipo</th>
              <th className="px-4 py-2 border-b text-center">Categoria</th>
              <th className="px-4 py-2 border-b text-center">Importo</th>
              <th className="px-4 py-2 border-b text-center">Data</th>
              <th className="px-4 py-2 border-b text-center">Descrizione</th>
              <th className="px-4 py-2 border-b text-center">Saldo</th>
              <th className="px-4 py-2 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.sort((a,b) => a.date > b.date ?  1 : -1).map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.type ? "Entrata" : "Spesa"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.category === 1 ? "Alimenti" : transaction.category===2 ? "Famiglia": transaction.category=== 3 ? "Vestiti" : transaction.category===4 ?"Svago" : transaction.category===5 ?"Istruzione": "Nessuna"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.amount} €
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.description || "-"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.category!=6 ? transaction.type === true ? saldo += transaction.amount : saldo -= transaction.amount : saldo-= transaction.amount}€
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                  >
                    Elimina
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    {transactions && transactions.length>0 ?
      <SaldoChart transactions={transactions}/> :
      <p className="text-center text-5xl py-10 italic underline">Non ci sono transazioni</p>
    }
    
    </div>
    <Footer />
    </>
  );
};

export default UserTransactions;
