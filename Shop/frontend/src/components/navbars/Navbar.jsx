import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Signup from '../../authentication/SignupModal';
import Login from '../../authentication/LoginModal';
import Logout from '../../authentication/Logout';
import { GeneralContext, RoleType } from '../../App';
import CategoryNavbar from './CategoryNavbar';
import Cart from '../cart/Cart';
import SearchBar from '../searchbar/SearchBar';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
  const navigate = useNavigate();

  const { user, isDarkMode, setIsDarkMode } = useContext(GeneralContext)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };
  console.log(isDarkMode);
  return (
    <>
      <div className='nav-container'>
        <nav className={`top-nav ${isDarkMode ? 'dark' : 'light'}`}>
          <Link to="/">
            <img className='logo' src="https://en.pimg.jp/058/800/704/1/58800704.jpg" alt="logo" />
          </Link>
          <ul className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              <li className='remove-search'><SearchBar /></li>

            </div>
            {isSmallScreen ? <CategoryNavbar /> : ''}
            {user ? (
              <>
                <div className='user-box'>
                  <Logout />
                  <FaRegUser onClick={() => navigate('/my-account')} className='user-icon' />
                  {user?.roleType == RoleType.admin ? <ImStatsDots className='admin-icon' onClick={()=>navigate('/dashboard')} />
                    : ''}
                  <Cart />
                </div>
              </>
            ) : (
              <>
                <div className='guest-box'>
                  <li><Signup /></li>
                  <li><Login /></li>

                </div>
              </>
            )}
          </ul>
          {!isDarkMode ? <MdOutlineDarkMode className='theme-btn' onClick={() => setIsDarkMode(true)} /> : <MdOutlineLightMode className='theme-btn' onClick={() => setIsDarkMode(false)} />}
          <div id='mobile' onClick={handleClick}>
            <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
        {isSmallScreen ? <SearchBar /> : <CategoryNavbar />}
      </div>
    </>
  );
};

export default Navbar;
