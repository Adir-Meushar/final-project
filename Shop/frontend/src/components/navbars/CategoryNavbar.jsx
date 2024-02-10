import React from 'react';
import { Link } from 'react-router-dom';

function CategoryNavbar() {
    return (
        <div>
            <nav id="category-navbar">
                <ul>
                    <li><Link to="/vegetables">Vegetables</Link></li>
                    <li><Link to="/fruits">Fruits</Link></li>
                    <li><Link to="/eggs-dairy">Eggs&Dairy</Link></li>
                    <li><Link to="/bakery">Bakery</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNavbar;
