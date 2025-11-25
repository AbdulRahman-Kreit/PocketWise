import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// يجب أن يكون لديك أيقونات مثل Font Awesome مثبتة لاستخدام 'fa-bars' و 'fa-times'
// إذا لم تكن كذلك، يمكنك استخدام أحرف نصية بسيطة مثل '≡' و '×'

export default function NavBar() {
    // 1. حالة لإدارة فتح وإغلاق القائمة الجانبية
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    // دالة لتبديل حالة القائمة
    const toggleMobileNav = () => {
        setIsMobileNavOpen(prev => !prev);
    };

    // دالة لتحديد الفئة النشطة
    const toggleActive = ({ isActive }) => {
        return isActive ? 'link active' : 'link';
    };

    // دالة مساعدة لتغليف روابط NavLink (لتقليل التكرار)
    const renderLinks = () => (
        <>
            <NavLink className={toggleActive} to="/" onClick={isMobileNavOpen ? toggleMobileNav : null}>
                Dashboard
            </NavLink>
            <NavLink className={toggleActive} to="/add" onClick={isMobileNavOpen ? toggleMobileNav : null}>
                Add Transaction
            </NavLink>
            <NavLink className={toggleActive} to="/history" onClick={isMobileNavOpen ? toggleMobileNav : null}>
                History
            </NavLink>
        </>
    );

    return (
        <>
            <button className="menu-icon" onClick={toggleMobileNav} aria-label="Open menu">
                <i className="fas fa-bars"></i> 
            </button>
            <div className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleMobileNav} aria-label="Close menu">
                    <i className="fas fa-times"></i>
                </button>
                <h1>PocketWise</h1>
                <div className="links">
                    {renderLinks()}
                </div>
            </div>

            <div className='navbar'>
                <h1>PocketWise</h1>
                <div className="links">
                    {renderLinks()}
                </div>
            </div>
        </>
    );
}