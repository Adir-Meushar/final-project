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
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isDarkMode, setIsDarkMode,isSmallScreen, setIsSmallScreen } = useContext(GeneralContext)

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

  const shouldRender = ['/vegetables', '/fruits', '/bakery', '/dairy&egss','/'].includes(location.pathname);
//https://i.pinimg.com/564x/1c/ae/59/1cae59cf6810a4665e5c48f9f6053384.jpg
//https://i.pinimg.com/564x/c3/b6/28/c3b628c8f1210f266feb82d4641f97c9.jpg //2
//https://i.pinimg.com/564x/35/df/55/35df55d1d3cfb5883b7b818ccc9cbf01.jpg //1
//https://i.pinimg.com/564x/c3/a9/ac/c3a9ac234f2fdb8b038926853e6a9738.jpg
//https://i.pinimg.com/564x/16/5b/4f/165b4f833e087ec50a58dbd2b8da58d4.jpg
//https://i.pinimg.com/564x/1c/33/3b/1c333bbc0b5a1a262bfc70d8dbffaac6.jpg
//https://i.pinimg.com/564x/a2/7e/3a/a27e3a318ad5eb863fe9a32c8b8ab6f5.jpg
  return (
    <>
      <div className='nav-container'>
        <nav className={`top-nav ${isDarkMode ? 'dark' : ''}`}>
          <Link to="/">
            <img className='logo' src="https://i.pinimg.com/564x/c3/b6/28/c3b628c8f1210f266feb82d4641f97c9.jpg " alt="logo" />
          </Link>
          <ul className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              {shouldRender && <li className='remove-search'><SearchBar /></li>}
            </div>
            {isSmallScreen ? (shouldRender? <CategoryNavbar clicked={clicked} handleClick={handleClick} />:<div onClick={() => { navigate('/'); handleClick(); }}  class="icon icon-rotate home-icon"><i class="fa fa-home"></i></div> ): ''}
            {user ? (
              <>
                <div className='user-box'>
                  <Logout clicked={clicked} handleClick={handleClick} />
                  <div onClick={() => {navigate('/my-account');handleClick();}} class="icon icon-enter"><i class="fa fa-user"></i></div>
                  {user?.roleType == RoleType.admin ? <div onClick={() => { navigate('/dashboard'); handleClick(); }} class="icon icon-fill"><ImStatsDots className='admin-icon' /></div>
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
        {isSmallScreen ? (shouldRender ? <SearchBar /> : null) : <CategoryNavbar />}
      </div>
    </>
  );
};

export default Navbar;
