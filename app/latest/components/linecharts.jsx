import {React} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
          <p>{`Data: ${payload[0].payload.date}`}</p>
        </div>
      );
    }
  
    return null;
}

const LineCharts = ({transactions}) => {
  return (
    <div className='flex flex-col md:flex-row h-72 w-full mx-auto gap-2 justify-between'>
        <div className='w-1/2 m-4'>
            <ResponsiveContainer height="100%" width="100%" className="bg-white shadow shadow-blue-500 rounded">
                <LineChart className='mx-auto' width={540} height={250} data={transactions.filter(item => item.type).sort((a,b) => a.date > b.date ?  1 : -1)} margin={{ top: 20, right: 30, left: 0, bottom: 15 }} >
                    <XAxis dataKey="date" />
                    <YAxis dataKey="amount"/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend />
                    <Line name="Entrate" type="linear" dataKey="amount" stroke="green" strokeWidth="2"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className='w-1/2 m-4'>
            <ResponsiveContainer height="100%" width="100%" className="bg-white shadow shadow-blue-500 rounded">
            <LineChart width={540} height={250} data={transactions.filter(item => !item.type)} margin={{ top: 20, right: 20, left: 0, bottom: 15 }}>
                <XAxis dataKey="date" />
                <YAxis dataKey="amount" name=''/>
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Line name="Spese" type="linear" dataKey="amount" stroke="red" strokeWidth="2"/>
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default LineCharts