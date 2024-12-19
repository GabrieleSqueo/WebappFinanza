import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(req) {
  const { spesePerCategoria, saldo } = await req.json(); // Assicurati di ricevere i dati necessari

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `In base alle seguenti transazioni "${JSON.stringify(spesePerCategoria)}", con saldo ${JSON.stringify(saldo)} esegui le seguenti analisi:
          
          1. **Stima della spesa per il prossimo mese**:
            - Calcola la spesa totale prevista tra oggi e 30 giorni a venire.
            - Considera un possibile aumento o decremento delle spese in base alle festività.
          
          2. **Stima della spesa attorno al compleanno, essa non può essere 0, interpretala dalle altre spese quanto può essere**:
            - Calcola una stima della spesa concentrata nei giorni vicini al compleanno.
          
          3. **Simulazione di riduzioni delle spese**:
            - Applica riduzioni del 10%, 20% e 50% sulle spese totali, escludendo le spese con "category: 6".
            - Per ciascuna riduzione fornisci:
              - Il totale risparmiato.
              - La spesa ridotta suddivisa per categoria.
              - Il nuovo saldo sommando da quello passato la riduzione.
          
            Restituisci un JSON ben strutturato con il seguente schema, non aggiungere altri commenti:
            {
              "next_month_estimate": "number",
              "birthday_spending_estimate": "number",
              "reductions": [
                {
                  "reduction_percentage": "number",
                  "total_savings": "number",
                  "category_savings": {
                    "category_1": "number",
                    "category_2": "number",
                    "null": "number",
                    "...": "number"
                  },
                  "new_total": "number"
                }
              ]
            }
            
            Non considerare le transazioni con "category: 6".
            Controlla che se ci sono spese nelle varie categorie, esse non devono avere sconti uguali a 0.
            La spesa per il compleanno non deve essere 0.
            Se qualcuna di queste regole viene infranta, ricalcola`
        }
      ]
    });

    return new Response(JSON.stringify(completion.choices[0].message.content), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: 'C\'è stato un errore nella chiamata a OpenAI.' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
