import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ payload, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="desc">{`${payload[0].value}`}</p>
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