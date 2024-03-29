import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GeneralContext } from '../../App';
import './category-navbar.css'

function CategoryNavbar({clicked,handleClick}) {
    const {isDarkMode} = useContext(GeneralContext)
    const location = useLocation();
    const showNavbarRoutes = ['/about', '/dashboard', '/my-account', '/checkout'];

    const shouldRenderUl = !showNavbarRoutes.includes(location.pathname);
    const ulClass = shouldRenderUl ? 'enabled' : 'disabled';

    return (
        <div>
            <nav className={`category-navbar ${isDarkMode ? 'dark' : 'light'}`}>
                <ul className={ulClass}>
                    <li><Link onClick={handleClick} to="/vegetables">Vegetables</Link></li>
                    <li><Link onClick={handleClick} to="/fruits">Fruits</Link></li>
                    <li><Link onClick={handleClick} to="/bakery">Bakery</Link></li>
                    <li><Link onClick={handleClick} to="/dairy&egss">Dairy&Egss</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNavbar;
