import React, { useContext, useState } from 'react';
import './navbar.css';
import Signup from '../authentication/SignupModal';
import Login from '../authentication/LoginModal';
import Logout from '../authentication/Logout';
import { GeneralContext } from '../App';
import CategoryNavbar from './CategoryNavbar'; // Import CategoryNavbar

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const { user } = useContext(GeneralContext);

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
            {user ? <li><Logout/></li> : ''} 
          </ul>
        </div>
        <div id='mobile' onClick={handleClick}>
          <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
      {/* Always render CategoryNavbar */}
      <CategoryNavbar />
    </>
  );
};

export default Navbar;


// .grid-container {
//   display: grid;
//   grid-template-columns: repeat(5,1fr);
//   grid-gap: 20px;
// }

// .card {
//   background-color: #fff;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// }

// .card-image {
//   height: 210px;
// }

// .card-content {
//   padding: 20px;
// }

// .card-title {
//   text-align: left;
//   font-size: 1.1rem;
// }

// .card-description {
//   margin: 0;
//   font-size: 1rem;
// }

// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import './navbar.css';
// import Signup from '../../authentication/SignupModal';
// import Login from '../../authentication/LoginModal';
// import Logout from '../../authentication/Logout';
// import { GeneralContext, RoleType } from '../../App';
// import CategoryNavbar from './CategoryNavbar';

// const Navbar = () => {
//   const [clicked, setClicked] = useState(false);
//   const [activeLink, setActiveLink] = useState('Home');
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 769);

//   const { user } = useContext(GeneralContext)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 769);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleClick = () => {
//     setClicked(!clicked);
//   };

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//     setClicked(false);
//   };

//   return (
//     <>
//     <div className='nav-container'>
//       <nav className='top-nav'>
//         <Link to="/">
//           <img className='logo' src="https://en.pimg.jp/058/800/704/1/58800704.jpg" alt="logo" />
//         </Link>
//         <div>
//           <ul id='navbar' className={clicked ? 'navbar active' : 'navbar'}>
//             <li><Link to="/about" className={activeLink === 'About' ? 'active' : ''} onClick={() => handleLinkClick('About')}>About</Link></li>
//             <li><Link to="/contact" className={activeLink === 'Contact' ? 'active' : ''} onClick={() => handleLinkClick('Contact')}>Contact</Link></li>
//             {isSmallScreen ? <CategoryNavbar /> : ''}
//             {user ? (
//               <>
//               {user.roleType==RoleType.admin?<li><Link to="/dashboard" className={activeLink === 'Dashboard' ? 'active' : ''} onClick={() => handleLinkClick('Dashboard')}>Dashboard</Link></li>:''}
//               <h3 style={{color:'white'}}>Hi there {user.fullName.first}!</h3>
//                 <li><Logout /></li>
//               </>
//             ) : (
//               <>
//                 <li><Signup /></li>
//                 <li><Login /></li>
//               </>
//             )}
//           </ul>
//         </div>
//         <div id='mobile' onClick={handleClick}>
//           <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
//         </div>
//       </nav>
//       {isSmallScreen ? '' : <CategoryNavbar />}
//       </div>
//     </>
//   );
// };

// export default Navbar;




// import React, { useState } from 'react';
// import './card.css';
// import './product-details.css'
// const CardComponent = ({ items }) => {
//   const [modal, setModal] = useState(false);
//   const [sortOption, setSortOption] = useState('low');

//   const handleSortChange = (ev) => {
//     setSortOption(ev.target.value);
//   };

//   const sortItems = (items) => {
//     return items.slice().sort((a, b) => {
//       if (sortOption === 'low') {
//         return a.price - b.price;
//       } else {
//         return b.price - a.price;
//       }
//     });
//   };
//   console.log(items);
//   return (
//     <>
//       <select name="" id="" onChange={handleSortChange}>
//         <option value="low">Price: Low to High</option>
//         <option value="high">Price: High to Low</option>
//       </select>
//       <div className="grid-container">
//         {sortItems(items).map(item => (
//           <div onClick={() => setModal(true)} key={item.title} className="card">
//             <img src={item.img.url} alt={item.title} className="card-image" />
//             <div className="card-content">
//               <h3 className="card-title">{item.title}</h3>
//               <p className="card-price">{item.price} &#8362;/kg </p>
//             </div>
//             {modal && (
//               <div className="modal-frame-details">
//                 <div className='product-details'>
//                   <h1>{item.title} </h1>
//                   <img src={item.img.url} alt={item.title} className="card-image" />
//                   <p>{item.description}</p>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Calories</th>
//                         <th>carbohydrates</th>
//                         <th>protein</th>
//                         <th>fat</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>{item.nutritionalValue.calories}</td>
//                         <td>{item.nutritionalValue.carbohydrates}</td>
//                         <td>{item.nutritionalValue.protein}</td>
//                         <td>{item.nutritionalValue.fat}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>

//         ))}
//       </div>

//     </>
//   );
// };

// export default CardComponent;
