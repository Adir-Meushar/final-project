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


  // const shouldRenderSearchBar = !['/about', '/dashboard', '/my-account', '/checkout'].includes(location.pathname);
  const shouldRender = ['/vegetables', '/fruits', '/bakery', '/dairy&egss','/'].includes(location.pathname);
// https://en.pimg.jp/058/800/704/1/58800704.jpg
//https://i.pinimg.com/564x/24/67/20/24672086120c1e8f0b6192f1b86de4ec.jpg
//https://i.pinimg.com/564x/04/61/15/04611584c1a983b86242d873b2fbb1cd.jpg
//https://i.pinimg.com/564x/2c/76/68/2c7668186f41f093f87aba59d82fd268.jpg
  return (
    <>
      <div className='nav-container'>
        <nav className={`top-nav ${isDarkMode ? 'dark' : 'light'}`}>
          <Link to="/">
            <img className='logo' src="https://i.pinimg.com/564x/24/67/20/24672086120c1e8f0b6192f1b86de4ec.jpg" alt="logo" />
          </Link>
          <ul className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              {shouldRender && <li className='remove-search'><SearchBar /></li>}
            </div>
            {isSmallScreen ? (shouldRender? <CategoryNavbar clicked={clicked} handleClick={handleClick} />:<Link to={'/'}><div class="icon icon-rotate home-icon"><i class="fa fa-home"></i></div></Link>  ): ''}
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
