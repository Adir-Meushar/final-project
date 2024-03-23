import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import './navbar-buttons.css';
import Signup from '../../authentication/SignupModal';
import Login from '../../authentication/LoginModal';
import Logout from '../../authentication/Logout';
import { GeneralContext, RoleType } from '../../App';
import CategoryNavbar from './CategoryNavbar';
import Cart from '../cart/Cart';
import SearchBar from '../searchbar/SearchBar';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
  const navigate = useNavigate();
  const location = useLocation();
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


  const shouldRenderSearchBar = !['/about', '/dashboard', '/my-account', '/checkout'].includes(location.pathname);

  return (
    <>
      <div className='nav-container'>
        <nav className={`top-nav ${isDarkMode ? 'dark' : 'light'}`}>
          <Link to="/">
            <img className='logo' src="https://en.pimg.jp/058/800/704/1/58800704.jpg" alt="logo" />
          </Link>
          <ul className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              {shouldRenderSearchBar && <li className='remove-search'><SearchBar /></li>}
            </div>
            {isSmallScreen ? <CategoryNavbar /> : ''}
            {user ? (
              <>
                <div className='user-box'>
                  <Logout />
                  <div onClick={() => navigate('/my-account')} class="icon icon-enter"><i class="fa fa-user"></i></div>
                  {user?.roleType == RoleType.admin ? <div onClick={() => navigate('/dashboard')} class="icon icon-fill"><ImStatsDots className='admin-icon' /></div>
                    : ''}
                  <div className='remove-cart'><Cart /></div>
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
          {!isDarkMode ? <div class="icon icon-expand" onClick={() => setIsDarkMode(true)}><MdOutlineDarkMode className='theme-btn' /> </div> : <div class="icon icon-expand" onClick={() => setIsDarkMode(false)}><MdOutlineLightMode className='theme-btn' /></div>}
          {user ? <div className='cart-mobile'> <Cart /></div> : ''}
          <div id='mobile' onClick={handleClick}>
            <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
        {isSmallScreen ? (shouldRenderSearchBar ? <SearchBar /> : null) : <CategoryNavbar />}
      </div>
    </>
  );
};

export default Navbar;
