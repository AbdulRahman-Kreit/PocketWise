import React, { useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionProvider'

export default function Dashboard() {
    const { summary, transactions, sortNewestToOldest } = useContext(TransactionContext);
    const recentTransactions = sortNewestToOldest(transactions).slice(0, 4);

    return (
        <div className='dashboard'>
            <div className="summary">
                <div className="box">
                    <div className="icon">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                    <div className="text">
                        <p>Total Balance</p>
                        <p><span>$</span>{summary.totalBalance.toFixed(2)}</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon">
                        <i className="fa-solid fa-money-check-dollar"></i>
                    </div>
                    <div className="text">
                        <p>Expenses</p>
                        <p><span>$</span>{summary.totalExpenses.toFixed(2)}</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon">
                        <i className="fa-solid fa-money-bill-trend-up"></i>
                    </div>
                    <div className="text">
                        <p>Income</p>
                        <p><span>$</span>{summary.totalIncome.toFixed(2)}</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon">
                        <i className="fa-solid fa-wallet"></i>
                    </div>
                    <div className="text">
                        <p>Savings</p>
                        <p><span>$</span>{summary.totalSavings.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                <h3 className='title'>
                    <div>Transaction</div>
                    <div>Date</div>
                    <div>Type</div>
                    <div>Amount</div>
                </h3>
                <ul className="list">
                    {recentTransactions.map((transaction) => {
                        return(
                            <li className="listItem" key={transaction.id} index={transaction.id}>
                                <div className="textbox">
                                    <div>{transaction.name}</div>
                                    <div>{`${transaction.date.month} / ${transaction.date.day} / ${transaction.date.year}`}</div>
                                    <div>{transaction.type}</div>
                                    <div>${transaction.amount}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
