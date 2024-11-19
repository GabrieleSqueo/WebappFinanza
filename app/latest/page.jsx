import React from 'react'
import Graphs from './components/graphs'
import Link from 'next/link'
import Transactions from './components/transactions'

const Latest = () => {
  return (
    <div>
      {//<Graphs />
      }
      <Link href="/tables"> Tabelle entrate ed uscite </Link>
      <Transactions />
    </div>
    
    
  )
}

export default Latest