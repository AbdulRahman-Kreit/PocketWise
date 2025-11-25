/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

export const TransactionContext = createContext();

// For generating unique ids to transactions
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default function TransactionProvider({ children }) {
    // --- Initial State Functions ---
    // For transactions
    const getInitialTransactions = () => { 
        const storedTransactions = localStorage.getItem('transactions');
        try {
            return storedTransactions ? JSON.parse(storedTransactions) : [];
        } catch(error) {
            console.error("Error parsing transactions from localStorage:", error);
            return [];
        }
    } 
    // For filtered transactions
    const getInitialFilter = () => {
        const storedFilter = localStorage.getItem('filter');
        return storedFilter || 'All Transactions';
    };
    // For sorted transactions
    const getInitialSort = () => {
        const storedSort = localStorage.getItem('sort');
        return storedSort || 'Newest to Oldest';
    }

    // --- State Declarations ---
    // To add the form value to transaction list
    const [transactions, setTransactions] = useState(getInitialTransactions);
    // Filter Type (All, Income, Expenses)
    const [filter, setFilter] = useState(getInitialFilter); 
    // Sort Type (Oldest first, Newest first)
    const [sortType, setSortType] = useState(getInitialSort);
    // the sorted list
    const [sortedAndFilteredTransactions, setSortedAndFilteredTransactions] = useState([]);
    // To store the search term
    const [searchTerm, setSearchTerm] = useState('');

    // --- Local Storage ---
    // Effect to handle saving transactions & filter & sort
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('filter', filter);
        localStorage.setItem('sort', sortType);
    }, [transactions, filter, sortType]);

    // --- Sorting Functions ---
    // Function to converting date to object
    const convertDateToComparable = (dateObject) => {
        const { month, day, year } = dateObject;
        return new Date(year, month - 1, day);
    }
    // For sorting transactions from oldest to newest
    const sortOldestToNewest = (transactionList) => {
        return transactionList.slice().sort((a, b) => {
            const dateA = convertDateToComparable(a.date);
            const dateB = convertDateToComparable(b.date);
            
            return dateA - dateB;
        })
    }
    // For sorting transactions from newest to oldest
    const sortNewestToOldest = (transactionList) => {
        return transactionList.slice().sort((a, b) => {
            const dateA = convertDateToComparable(a.date);
            const dateB = convertDateToComparable(b.date);
            
            return dateB - dateA;
        })
    }

    // Effect updates the displayed list according to transaction type & sort the list 
    // & search for the wanted transactions
    useEffect(() => {
        let searchResult = transactions.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        let filteredList = [];
        switch (filter) {
            case 'Income':
                filteredList = transactions.filter(t => t.type === 'Income');
                break;
            case 'Expenses':
                filteredList = transactions.filter(t => t.type === 'Expenses');
                break;
            case 'All Transactions':
            default:
                filteredList = searchResult;
                break;
        }

        
        let sortedList = [];
        if (sortType === 'Oldest to Newest') {
            sortedList = sortOldestToNewest(filteredList);
        } else if (sortType === 'Newest to Oldest') {
            sortedList = sortNewestToOldest(filteredList);
        } else {
            sortedList = filteredList;
        }

        setSortedAndFilteredTransactions(sortedList);

    }, [transactions, filter, sortType, searchTerm]);

    // For updating year automaticaly
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // To Show the success message
    const [isMsgAppeared, setIsMsgAppeared] = useState(false);

    const toggleAppearMsg = () => {
        setIsMsgAppeared(prevIsMsgAppeared => !prevIsMsgAppeared);
    }

    // To store the transaction for editing
    const [transactionToEdit, setTransactionToEdit] = useState(null);

    const navigate = useNavigate();

    // Form Validation
    // To store form values
    const [formData, setFormData] = useState({
        name: '',
        date: {
            month: '',
            day: '',
            year: ''
        },
        amount: '',
        type: ''
    });

    // To store errors
    const [errors, setErrors] = useState({});


    // Changes processing
    const handleChanges = (e) => {
        const { name, value, type, checked, dataset } = e.target;
        const isDateInput = dataset.group === 'date'; 

        if (isDateInput) {
            setFormData(prevData => ({
                ...prevData,
                date: {
                    ...prevData.date,
                    [name]: value,
                }
            }));
        } else {
            const newValue = type === 'radio' ? (checked ? value : formData[name]) : value;
            
            setFormData(prevData => ({
                ...prevData,
                [name]: newValue,
            }));
        }
    }


    // For verifying fields validation
    const validate = () => {
        let validationErrors = {
            date: {},
        };
        let isValid = true;

        // Checking the name field validation
        if (!formData.name.trim()) {
            validationErrors.name = "Field is required";
            isValid = false;
        } else if (formData.name.trim().length < 3) {
            validationErrors.name = "Name must contain at least 3 characters";
            isValid = false;
        }

        // Checking the date validation
        const { month, day, year } = formData.date;
        const monthValue = parseInt(month, 10);
        const dayValue = parseInt(day, 10);
        const yearValue = parseInt(year, 10);

        if (!month || !day || !year) {
        if (!month) validationErrors.date.month = "Required";
        if (!day) validationErrors.date.day = "Required";
        if (!year) validationErrors.date.year = "Required";
        isValid = false;
    } else {
        const inputDate = new Date(yearValue, monthValue - 1, dayValue);
        const currentDate = new Date();

        if (inputDate.getFullYear() !== yearValue || inputDate.getMonth() !== monthValue - 1 ||
            inputDate.getDate() !== dayValue
        ) {
            validationErrors.date.month = "Invalid Date";
            validationErrors.date.day = "Invalid Date";
            validationErrors.date.year = "Invalid Date";
            isValid = false;
        } 

        else if (yearValue < 1900 || yearValue > currentDate.getFullYear()) {
            validationErrors.date.year = `Year must be between 1900 and ${currentDate.getFullYear()}`;
            isValid = false;
        }
    }

        // Checking the amount validation
        const amountValue = Number(formData.amount);

        if (!formData.amount) {
            validationErrors.amount = "Field is required";
            isValid = false;
        } else if (isNaN(amountValue)) {
            validationErrors.amount = "Enter an integer number";
            isValid = false;
        } else if (amountValue < 1) {
            validationErrors.amount = "Amount must be at least 1";
            isValid = false;
        }

        // Checking the type validation
        if (!formData.type) {
            validationErrors.type = 'Must choose the type';
            isValid = false;
        }

        if (Object.keys(validationErrors.date).length === 0) {
            delete validationErrors.date;
        }

        // Update the error state
        setErrors(validationErrors);
        return isValid;
    }

    // Function for clear the form values
    const clearForm = () => {
    setFormData({
        name: '',
        date: {
            month: '',
            day: '',
            year: ''
        },
        amount: '',
        type: ''
    });

    setErrors({});
}

    // Submit Processing Function
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const isValid = validate();

        if (isValid) {
            if (transactionToEdit) {
                // Edit Mode
                const updatedTransactionObject = {
                    id: transactionToEdit.id,
                    name: formData.name,
                    date: formData.date,
                    type: formData.type,
                    amount: formData.amount
                }
                const newTransactionList = transactions.map(t => 
                    t.id === transactionToEdit.id ? updatedTransactionObject : t
                );
                setTransactions(newTransactionList);
                setTransactionToEdit(null);
            } else {
                // Add Mode
                const newTransactionObject = {
                    id: generateUniqueId(),
                    name: formData.name,
                    date: formData.date,
                    type: formData.type,
                    amount: formData.amount
                }
                const newTransactionList = (prevTransactions => 
                    [...prevTransactions, newTransactionObject]);
                setTransactions(newTransactionList);
                console.log('Form was sent successfully', formData);
            }
            
            toggleAppearMsg();
            clearForm();
        } else {
            console.log('Form validation was faild!');
        }
    }, [transactionToEdit, transactions, formData]);

    // Delete Function
    const handleDeleteTransaction = useCallback((transactionId) => {
        let newTransactionList = transactions.filter((transaction) => {
            return transaction.id !== transactionId;
        })
        setTransactions(newTransactionList);
    }, [transactions])

    // Edit function
    const handleEditTransaction = (transactionId) => {
        const transactionToFind = transactions.find(transaction => transaction.id === transactionId);
        if (transactionToFind) {
            setTransactionToEdit(transactionToFind);
            setFormData({
                name: transactionToFind.name,
                date: transactionToFind.date, 
                amount: transactionToFind.amount.toString(),
                type: transactionToFind.type
            });
            navigate('/add');
        }
    }

    // Calculate summary
    const calculateSummary = (transactionList) => {
        // Calculate income
        const totalIncome = transactionList.filter(t => t.type === 'Income').
        reduce((sum, t) => sum + Number(t.amount), 0);
        
        // Calculate expenses
        const totalExpenses = transactionList.filter(t => t.type === 'Expenses').
        reduce((sum, t) => sum + Number(t.amount), 0);

        // Calculate total balance & savings
        const totalBalance = totalIncome - totalExpenses;

        const totalSavings = totalBalance

        return{ totalIncome, totalExpenses, totalBalance, totalSavings };
    }

    const summary = useMemo(() => {
        return calculateSummary(transactions)
    }, [transactions]);

    

    return (
        <TransactionContext.Provider value={{
            currentYear,
            isMsgAppeared,
            formData,
            errors,
            handleChanges,
            handleSubmit,
            toggleAppearMsg,
            transactions,
            sortedAndFilteredTransactions,
            handleDeleteTransaction,
            handleEditTransaction,
            transactionToEdit,
            filter,
            setFilter,
            sortType,
            setSortType,
            searchTerm,
            setSearchTerm,
            summary,
            sortNewestToOldest,
        }}>
            { children }
        </TransactionContext.Provider>
    )
}
