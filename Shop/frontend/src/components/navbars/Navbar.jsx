import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Signup from '../../authentication/SignupModal';
import Login from '../../authentication/LoginModal';
import Logout from '../../authentication/Logout';
import { GeneralContext, RoleType } from '../../App';
import CategoryNavbar from './CategoryNavbar';
import Cart from '../cart/Cart';
 
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 769);

  const { user } = useContext(GeneralContext)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 769);
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

  return (
    <>
      <div className='nav-container'>
        <nav className='top-nav'>
          <Link to="/">
            <img className='logo' src="https://en.pimg.jp/058/800/704/1/58800704.jpg" alt="logo" />
          </Link>
          <ul id='navbar' className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              <li><Link to="/about" className={activeLink === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>About</Link></li>
              <li><Link to="/contact" className={activeLink === 'Contact' ? 'active' : ''} onClick={() => handleLinkClick('Contact')}>Contact</Link></li>
              {user?.roleType == RoleType.admin ? <li><Link to="/dashboard" className={activeLink === 'Dashboard' ? 'active' : ''} onClick={() => handleLinkClick('Dashboard')}>Dashboard</Link></li> : ''}
            </div>
            {isSmallScreen ? <CategoryNavbar /> : ''}
            {user ? (
              <>
                <div className='user-box'>
                  <Cart/>
                  <h3 style={{ color: 'white' }}>Hello {user.fullName.first}!</h3>
                  <li><Logout /></li>
                </div>
              </>
            ) : (
              <>
              <div className='user-box'>
              
              <li><Signup /></li>
              <li><Login /></li>
              </div>
              </>
            )}
          </ul>

          <div id='mobile' onClick={handleClick}>
            <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
        {isSmallScreen ? '' : <CategoryNavbar />}
      </div>
    </>
  );
};

export default Navbar;
