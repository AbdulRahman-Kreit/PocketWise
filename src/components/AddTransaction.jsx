import React, { useContext } from 'react'

import { TransactionContext } from '../contexts/TransactionProvider';

import SuccessMessage from './SuccessMessage';

export default function AddTransaction() {
    const { 
        isMsgAppeared,
        toggleAppearMsg,
        handleSubmit,
        formData,
        handleChanges,
        errors,
        currentYear,
        transactionToEdit,
    } = useContext(TransactionContext);

const errorTextStyle = { color: 'red', fontSize: '12px', margin: '5px 0 0 0'};

    return (
        <div className='add-transaction'>
            {isMsgAppeared && <SuccessMessage onClose={toggleAppearMsg}/>}
            <form onSubmit={handleSubmit}>
                <div className="name-section">
                    <h3>Tansaction Name</h3>
                    <input 
                        type="text" 
                        name="name" 
                        id="t-name" 
                        placeholder='Enter transaction name' 
                        value={formData.name} 
                        onChange={handleChanges} 
                        required
                    />
                    {errors.name && <p style={errorTextStyle}>{errors.name}</p>}
                </div>
                <div className="date-section">
                    <h3>Transaction Date</h3>
                    <div className="date">
                        <div>
                            <input 
                                type="number" 
                                name="month" 
                                id="month-input" 
                                data-group="date" 
                                min="1" 
                                max="12" 
                                placeholder='Month' 
                                value={formData.date.month} 
                                onChange={handleChanges} 
                                required 
                            />
                            <label htmlFor="month-input">Month</label>
                            {errors.date && errors.date.month && <p style={errorTextStyle}>{errors.date.month}</p>} 
                        </div>
                        <div>
                            <input 
                                type="number" 
                                name="day" 
                                id="day-input" 
                                data-group="date"
                                min="1" 
                                max="31" 
                                placeholder='Day' 
                                value={formData.date.day} 
                                onChange={handleChanges} 
                                required 
                            />
                            <label htmlFor="day-input">Day</label>
                            {errors.date && errors.date.day && <p style={errorTextStyle}>{errors.date.day}</p>}
                        </div>
                        <div>
                            <input 
                                type="number" 
                                name="year" 
                                id="year-input" 
                                data-group="date"
                                min="1900" 
                                max={currentYear} 
                                placeholder='Year' 
                                value={formData.date.year} 
                                onChange={handleChanges} 
                                required 
                            />
                            <label htmlFor="year-input">Year</label>
                            {errors.date && errors.date.year && <p style={errorTextStyle}>{errors.date.year}</p>}
                        </div>
                    </div>
                </div>
                <div className="amount-section">
                    <h3>Transaction Amount</h3>
                    <input type="number" name="amount" id="amount-input" 
                    min={1} placeholder='Enter the transaction amount' value={formData.amount} 
                    onChange={handleChanges} required/>
                    {errors.amount && <p style={errorTextStyle}>{errors.amount}</p>}
                </div>
                <div className="type-section">
                    <h3>Transaction Type</h3>
                    <div>
                        <input 
                            type="radio" 
                            name="type" 
                            id="income-input"
                            value="Income" 
                            checked={formData.type === 'Income'} 
                            onChange={handleChanges} 
                        />
                        <label htmlFor="income-input">Income</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            name="type" 
                            id="expense-input"
                            value="Expenses" 
                            checked={formData.type === 'Expenses'} 
                            onChange={handleChanges} 
                        />
                        <label htmlFor="expense-input">Expenses</label>
                    </div>
                    {errors.type && <p style={errorTextStyle}>{errors.type}</p>}
                </div>
            </form>
            <button type='submit' onClick={handleSubmit} className="add-btn">
                {transactionToEdit ? 'Save Changes' : 'Add Transactoin'}
            </button>
        </div>
    )
}
