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
    <div className="flex flex-col p-8 bg-white rounded-lg shadow-md shadow-blue-500 h-full justify-between">
      <div>
        <h2 className="text-2xl text-blue-600 italic underline font-bold mb-8 text-center">
          Trasferisci al Salvadanaio
        </h2>
        <p className="text-black mb-4 text-lg">Saldo attuale: {currentBalanceState.toFixed(2)} €</p>
        <p className="text-black mb-8 text-lg">Salvadanaio: {savingsBalanceState.toFixed(2)} €</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          placeholder="Inserisci importo"
          max={currentBalance}
          min="0"
          step="0.01"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        />
      </div>

      <div className="mt-auto">
        <button
          onClick={handleTransfer}
          disabled={amount <= 0 || amount > currentBalance}
          className={`mx-auto flex flex-row gap-2 shadow-[0_3px_0_rgb(67,56,202)] w-min text-nowrap px-32 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-blue-800
            ${amount <= 0 || amount > currentBalance 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          Trasferisci
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default TransferToSavings;
