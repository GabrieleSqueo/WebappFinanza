"use client"
import { useEffect, useState } from "react";
import LineCharts from "./linecharts";
import BarCharts from "./barcharts";


const Graphs = ({ transactions }) => {
  

  return (
    <div className="min-h-72 flex flex-col">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight mb-3 sm:mb-6 mx-auto">Transazioni utente</h1>
      
      {transactions && transactions.length >0 ?
        <div className="flex flex-col gap-4">
            <LineCharts transactions={transactions}/>
            <BarCharts transactions={transactions}/>
        </div>  
      : <p className="mx-auto">Non hai ancora inserito transazioni</p>
      }
      
    </div>
  );
};

export default Graphs;
