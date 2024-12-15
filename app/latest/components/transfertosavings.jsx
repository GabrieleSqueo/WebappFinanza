"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Inizializza Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const TransferToSavings = ({ userId, currentBalance, savingsBalance }) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentBalanceState, setCurrentBalance] = useState(currentBalance); // Saldo attuale
  const [savingsBalanceState, setSavingsBalance] = useState(savingsBalance); 

  const handleTransfer = async () => {
    setError("");
    setSuccess("");

    // Controlla che l'importo sia valido
    if (amount <= 0) {
      setError("L'importo deve essere maggiore di 0.");
      return;
    }

    if (amount > currentBalance) {
      setError("Saldo insufficiente per effettuare il trasferimento.");
      return;
    }

    try {
      // Aggiorna i bilanci locali
      const newMainBalance = currentBalance - amount;
      const newSavingsBalance = savingsBalance + amount;

      // Registra la transazione nel database
      const { data, error } = await supabase.from("transactions").insert([
        {
          userid: userId,
          amount: amount,
          type: true, // Indica un'entrata nel salvadanaio
          category: 6, // Categoria 6: Trasferimento al salvadanaio
          description: "Trasferimento al salvadanaio",
          date: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      setSuccess("Trasferimento completato con successo!");
      setCurrentBalance(newMainBalance);
      setSavingsBalance(newSavingsBalance); // Aggiorna i bilanci visibili
      setAmount(0); // Resetta il campo di input
    } catch (error) {
      console.error("Errore durante il trasferimento:", error.message);
      setError("Errore durante il trasferimento. Riprova.");
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded shadow shadow-blue-500 min-h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4 mx-auto">Trasferisci al Salvadanio</h2>
      <p className="text-gray-600 mb-2">Saldo attuale: {currentBalanceState.toFixed(2)} €</p>
      <p className="text-gray-600 mb-4">Salvadanaio: {savingsBalanceState.toFixed(2)} €</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Inserisci importo"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={handleTransfer}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Trasferisci
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
};

export default TransferToSavings;
