"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/navbarTransactions";

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
    <div >
    <Navbar />
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
              <th className="px-4 py-2 border-b text-center">Type</th>
              <th className="px-4 py-2 border-b text-center">Category</th>
              <th className="px-4 py-2 border-b text-center">Amount</th>
              <th className="px-4 py-2 border-b text-center">Date</th>
              <th className="px-4 py-2 border-b text-center">Description</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.type ? "Income" : "Expense"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {transaction.category} || "-"
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
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default UserTransactions;
