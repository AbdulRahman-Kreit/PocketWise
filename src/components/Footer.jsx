import React, { useContext } from 'react'

import { TransactionContext } from '../contexts/TransactionProvider';

export default function Footer() {
    const { currentYear } = useContext(TransactionContext);

    return (
        <footer>
            <p className="footer-text">
                &copy; {currentYear} Code Art - All Rights Reserved
            </p>
        </footer>
    )
}
