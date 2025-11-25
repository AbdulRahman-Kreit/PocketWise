import React, { useContext } from 'react'

import { TransactionContext } from '../contexts/TransactionProvider'

export default function SuccessMessage() {
    const { toggleAppearMsg } = useContext(TransactionContext)

    return (
        <div className='success-msg'>
            <i className="fa-solid fa-circle-check"></i>
            <h2>
                Transaction Saved Successfully
            </h2>
            <button onClick={toggleAppearMsg}>
                Done
            </button>
        </div>
    )
}
