"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Predizioni = () => {
  const pathname = usePathname();
  const userId  = pathname.split("/")[3];
  const [transactions, setTransactions] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/getTransactions?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
        
        // Una volta ottenute le transactions, fai la chiamata OpenAI
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "user", "content": `In base a queste transazioni ${JSON.stringify(data)} calcola quando spenderà in questo periodo, tenendo conto anche delle festività,
            quando spenderà attorno al suo compleanno, e simula delle riduzioni nelle spese delle 10/20 e 50%, indicando per categoria quanto spenderebbe di meno e quanto saldo avrebbe, le spese con category 6 non devi tenerne conto.
            Dammi le rispsote in formato json`},
          ],
        });
        
        setPrediction(completion.choices[0].message);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {prediction && <div>{prediction.content}</div>}
    </div>
  );
};

export default Predizioni;