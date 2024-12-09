"use client"
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";


// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const Transactions = () => {

  const [type, setType] = useState("Income");

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Nessuna");

  const [date, setDate] = useState(Date)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);

  // Prendi l'utente loggato
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        setError("Error fetching user: " + error.message);
      } else {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }
    
    let typeBool = true;  // Set default value
    let categoryInt = 0;  // Set default value

    switch (type) {
      case "Income":
        typeBool = true;
        break;
      case "Expense":
        typeBool = false;
        break;
      default:
        console.warn(`Unexpected type value: ${type}`); // Add logging for debugging
    }

    if (category === "Alimenti") {
      categoryInt = 1;
    } else if (category === "Famiglia") {
      categoryInt = 2;
    } else if (category === "Vestiti") {
      categoryInt = 3;
    } else if (category === "Svago") {
      categoryInt = 4;
    } else if (category === "Istruzione") {
      categoryInt = 5;
    } else if (category === "Nessuna") {
      categoryInt = null;
    } else {
      console.warn(`Unexpected category value: ${category}`); // Add logging for debugging
    }

    console.log(typeBool + " " + categoryInt)

    const { error } = await supabase
      .from("transactions")
      .insert([{ type: typeBool, amount: parseFloat(amount), description, userid: user.id, date: date, category: categoryInt}]);

    if (error) {
      setError("Error saving transaction: " + error.message);
    } else {
      setSuccess("Transaction saved successfully!");
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("Nessuna")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full my-8 ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md shadow-blue-500">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add a Transaction
        </h2>
        <form onSubmit={handleSaveTransaction} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Income">Entrata</option>
              <option value="Expense">Spesa</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter date"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div className={`mb-4 ${type === "Income" ? "hidden" : ""}`}>
            <label className="block text-sm font-medium text-gray-700">
              Categoria (Optional)
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="categoriaSelezionata"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option id="0" value="Nessuna">Nessuna</option>
              <option id="1" value="Alimenti">Alimenti</option>
              <option id="2" value="Famiglia">Famiglia</option>
              <option id="3" value="Vestiti">Vestiti</option>
              <option id="4" value="Svago">Svago</option>
              <option id="5" value="Istruzione">Istruzione</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Transaction
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default Transactions;
