import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../App';
import './category-navbar.css'

function CategoryNavbar() {
    const {isDarkMode} = useContext(GeneralContext)

    return (
        <div>
            <nav className={`category-navbar ${isDarkMode ? 'dark' : 'light'}`}>
                <ul>
                    <li><Link to="/vegetables">Vegetables</Link></li>
                    <li><Link to="/fruits">Fruits</Link></li>
                    <li><Link to="/bakery">Bakery</Link></li>
                    <li><Link to="/dairy&egss">Dairy&Egss</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNavbar;
