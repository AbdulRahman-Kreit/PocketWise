/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionProvider'

export default function Controls() {
    const { filter, 
            setFilter, 
            sortType, 
            setSortType,
            searchTerm,
            setSearchTerm, } = useContext(TransactionContext);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef();
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef();

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen);
    }

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterOpen(false);
        } else if (sortRef.current && !sortRef.current.contains(event.target)) {
            setIsSortOpen(false);
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside]);

    const filterListItems = ['All Transactions', 'Income', 'Expenses'];
    const sortListItems = ['Newest to Oldest', 'Oldest to Newest'];

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        setIsFilterOpen(false);
    };

    const handleSortChange = (selectedSort) => {
        setSortType(selectedSort);
        setIsSortOpen(false);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className='controls'>
            <div className="search-container">
                <label htmlFor="search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </label>
                <input type="text" name="search" id="search-bar" className="search"
                placeholder='Enter transaction name' value={searchTerm}
                onChange={handleSearchChange} />
            </div>
            <div className="control-btns">
                <div className='sort-btn'>
                    <button onClick={toggleSortDropdown}>
                        <i className="fa-solid fa-sort"></i>
                    </button>
                    {isSortOpen &&
                        <div className="sort-list-container" ref={sortRef}>
                        <ul className="dropdown-list">
                            {sortListItems.map((item, index) => {
                                return(
                                    <li key={index} 
                                        className="dropdown-item"
                                        onClick={() => {handleSortChange(item)}}>
                                        <input type="radio" 
                                            checked={sortType === item}
                                            onChange={() => {}}/>
                                        <label>{item}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    }
                </div>
                <div className='filter-btn'>
                    <button onClick={toggleFilterDropdown}>
                        <i className="fa-solid fa-filter"></i>
                    </button>
                    {isFilterOpen && 
                    <div className="filter-list-container" ref={filterRef}>
                        <ul className="dropdown-list">
                            {filterListItems.map((item, index) => {
                                return(
                                    <li key={index} 
                                        className="dropdown-item"
                                        onClick={() => {handleFilterChange(item)}}>
                                        <input type="radio" 
                                            checked={filter === item}
                                            onChange={() => {}}/>
                                        <label>{item}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
