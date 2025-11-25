import React, { useContext } from 'react'

import { TransactionContext } from '../contexts/TransactionProvider'

export default function TransactionList() {
    const { sortedAndFilteredTransactions, 
            handleDeleteTransaction,
            handleEditTransaction } = useContext(TransactionContext);

    return (
        <div className='transaction-list'>
            <h3>
                <div>Transaction</div>
                <div>Date</div>
                <div>Type</div>
                <div>Amount</div>
            </h3>
            <div className="list-container">
                <ul className="list">
                    {sortedAndFilteredTransactions.map((transaction) => {
                        return(
                            <li className="listItem" key={transaction.id} index={transaction.id}>
                                <div className="textbox">
                                    <div>{transaction.name}</div>
                                    <div>{`${transaction.date.month} / ${transaction.date.day} / ${transaction.date.year}`}</div>
                                    <div>{transaction.type}</div>
                                    <div>${transaction.amount}</div>
                                </div>
                                <div className="t-btns">
                                    <button onClick={() => {handleEditTransaction(transaction.id)}}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={() => {handleDeleteTransaction(transaction.id)}}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
