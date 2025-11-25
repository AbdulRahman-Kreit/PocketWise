import React from 'react'

import Controls from './Controls'
import TransactionList from './TransactionList'

export default function TransactionHistory() {
    return (
        <div className='transaction-history'>
            <h1>Transaction History</h1>
            <Controls />
            <TransactionList />
        </div>
    )
}
