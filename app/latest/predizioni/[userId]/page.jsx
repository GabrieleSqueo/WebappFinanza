"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import Navbar from "../../components/navbar";
import Footer from "@/app/components/footer";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Predizioni = () => {
  const pathname = usePathname();
  const userId  = pathname.split("/")[3];
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPredictions = async (spesePerCategoria, saldo) => {
    setLoading(true); // Imposta loading a true quando inizia il caricamento
    try {
      const response = await fetch('/api/getPredictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spesePerCategoria, saldo }),
      });

      if (!response.ok) throw new Error('Failed to fetch predictions');
      const data = await response.json();
      setPrediction(data); // Imposta le predizioni ricevute
    } catch (error) {
      console.error("Error:", error);
      setError('C\'è stato un errore nel recupero delle predizioni.');
    } finally {
      setLoading(false); // Imposta loading a false quando il caricamento è completato
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/getTransactions?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        
        if (data.length === 0) {
          setError('Non ci sono transazioni disponibili.');
          return;
        }

        const saldo = data.reduce((acc, transaction) => {
          return transaction.category != 6 ? transaction.type ? acc + transaction.amount : acc - transaction.amount: acc - transaction.amount;
        }, 0);
        const transazioniUscite = data.filter(transaction => !transaction.type );
        
        // Nuovo array che somma le spese per categoria
        const spesePerCategoria = transazioniUscite.reduce((acc, transaction) => {
          if (transaction.category !== 6) {
            const categoria = transaction.category || null;
            acc[categoria] = (acc[categoria] || 0) + transaction.amount;
          }
          return acc;
        }, {});
        console.log(spesePerCategoria);

        // Dopo aver calcolato saldo e spesePerCategoria
        fetchPredictions(spesePerCategoria, saldo); // Chiamata alla nuova route API

      } catch (error) {
        console.error("Error:", error);
        setError('C\'è stato un errore nel recupero delle transazioni.');
      } 
    };

    fetchTransactions();
  }, [userId]);

  if (loading) return <div className="flex min-h-screen bg-gradient-to-r from-sky-700 to-70% to-indigo-800"><p className="mx-auto my-auto text-white text-xl">Caricamento...</p></div>;

  return (
    <div className="bg-gradient-to-r from-sky-700 to-70% to-indigo-800">
      <Navbar />
      {error ? (
        <div className="flex min-h-screen p-8">
          <p className="text-white text-xl mx-auto my-auto">{error}</p>
        </div>
      ) : (
        prediction && 
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Parsing del JSON e visualizzazione formattata */}
            {(() => {
              try {
                const data = JSON.parse(prediction.replace(/```json|```/g, ''));
                return (
                  <>
                    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                      <h2 className="text-2xl font-bold text-white mb-4">Stima per il Prossimo Mese</h2>
                      <p className="text-xl text-white">
                        Spesa prevista: <span className="text-yellow-200">€{data.next_month_estimate.toFixed(2)}</span>
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                      <h2 className="text-2xl font-bold text-white mb-4">Stima Spese Compleanno</h2>
                      <p className="text-xl text-white">
                        Spesa stimata: <span className="text-yellow-200">€{data.birthday_spending_estimate.toFixed(2)}</span>
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                      <h2 className="text-2xl font-bold text-white mb-4">Simulazioni di Risparmio</h2>
                      <div className="space-y-6">
                        {data.reductions.map((reduction, index) => (
                          <div key={index} className="border-t border-white/20 pt-4 first:border-0 first:pt-0">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              Riduzione del {reduction.reduction_percentage}%
                            </h3>
                            <div className="space-y-2">
                              <p className="text-white">
                                Risparmio totale: <span className="text-yellow-200">€{reduction.total_savings.toFixed(2)}</span>
                              </p>
                              <p className="text-white">
                                Nuovo totale: <span className="text-yellow-200">€{reduction.new_total.toFixed(2)}</span>
                              </p>
                              <div className="mt-2">
                                <p className="text-white font-medium mb-1">Risparmi per categoria:</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(reduction.category_savings).map(([category, saving]) => (
                                    <p key={category} className="text-white">
                                      Categoria {category.replace("category_", "").replace("null","non specificata")}: <span className="text-yellow-200">€{saving.toFixed(2)}</span>
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              } catch (error) {
                return (
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <p className="text-white">{error + prediction.content}</p>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Predizioni;