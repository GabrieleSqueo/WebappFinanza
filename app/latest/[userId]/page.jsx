"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

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

  useEffect(() => {
    console.log("ciao")
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Transactions for User
      </h1>

      {transactions.length === 0 ? (
        <p>No transactions found for this user.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Actions</th>
              <th className="px-4 py-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="">
                <td className="px-4 py-2 border-b  "><p className="justify-center">{transaction.amount}</p></td>
                <td className="px-4 py-2 border-b "> <p className="justify-center">
                  {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-4 py-2 border-b flex flex-row">
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none mx-auto"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 border-b ">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTransactions;
