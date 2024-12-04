import {React} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ payload, active }) {
  let category = ""
    if (active) {
      switch (payload[0].payload.category) {
        case 1:
          category = "Alimenti" 
          break;
        case 2:
          category = "Famiglia"
          break;
        case 3:
          category = "Vestiti"
          break;
        case 4:
          category = "Svago"
          break;
        case 5:
          category = "Istruzione"
          break;
        default:
          category = "Nessuna"
          break;
      } 
      return (
        <div className="custom-tooltip bg-white border-gray-300 border p-2">
          <p className="desc">{`Totale: ${payload[0].value}€`}</p>
          <p className='desc'>{`Categoria: ${category}`}</p>
        </div>
      );
    }
  
    return null;
}

const LineCharts = ({transactions}) => {
  return (
    <div className='flex flex-row h-56 w-full mx-auto'>
        <div className='h-full- w-1/2'>
            <ResponsiveContainer height="100%" width="100%">
                <LineChart width={730} height={250} data={transactions.filter(item => item.type).sort((a,b) => a.date > b.date ?  1 : -1)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="amount"/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend />
                    <Line type="linear" dataKey="amount" stroke="green" strokeWidth="2"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className='h-full w-1/2'>
            <ResponsiveContainer height="100%" width="100%">
            <LineChart width={730} height={250} data={transactions.filter(item => !item.type)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="amount"/>
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Line type="linear" dataKey="amount" stroke="red" strokeWidth="2"/>
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default LineCharts