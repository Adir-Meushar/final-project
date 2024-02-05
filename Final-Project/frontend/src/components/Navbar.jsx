import React, { useState } from 'react';
import './navbar.css';
import Signup from '../authentication/SignupModal';
import Login from '../authentication/LoginModal';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  return (
    <>
      <nav>
        <a href="index.html">
          <img className='logo' src="https://en.pimg.jp/058/800/704/1/58800704.jpg" alt="logo" />
        </a>

        <div>
          <ul id='navbar' className={clicked ? 'navbar active' : 'navbar'}>
            <li><a href="index.html" className={activeLink === 'Home' ? 'active' : ''} onClick={() => handleLinkClick('Home')}>Home</a></li>
            <li><a href="" className={activeLink === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>About</a></li>
            <li><a href="" className={activeLink === 'Contact' ? 'active' : ''} onClick={() => handleLinkClick('Contact')}>Contact</a></li>
            <li><Signup/></li>
            <li><Login/></li> 
          </ul>
        </div>
        <div id='mobile' onClick={handleClick}>
          <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
