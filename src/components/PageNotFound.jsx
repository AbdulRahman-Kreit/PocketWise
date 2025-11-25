import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='not-found-page'>
            <h1>404</h1>
            <p>
                This page is not found
            </p>
            <Link to='/'><i class="fa-solid fa-arrow-left"></i>Back</Link>
        </div>
    )
}
