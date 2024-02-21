//Card with different count state for each card

// import React, { useState, useEffect } from 'react';
// import './card.css';
// import ProductDetails from './ProductDetails';
// import Counter from '../../counter/Counter';

// const CardComponent = ({ items }) => {
//   const [modal, setModal] = useState(null);
//   const [sortOption, setSortOption] = useState('low');
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [countStates, setCountStates] = useState([]);

//   useEffect(() => {
//     if (items && items.length > 0) {
//       setCountStates(Array(items.length).fill(0));
//     }
//   }, [items]);

//   const handleSortChange = (ev) => {
//     setSortOption(ev.target.value);
//   };

//   const handleCardClick = (index) => {
//     setModal(index);
//   };

//   const handleMouseEnter = (index) => {
//     setHoveredIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredIndex(null);
//   };

//   const handleCountChange = (index, count) => {
//     const newCountStates = [...countStates];
//     newCountStates[index] = count;
//     setCountStates(newCountStates);
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

//   return (
//     <>
//       <select name="" id="" onChange={handleSortChange}>
//         <option value="low">Price: Low to High</option>
//         <option value="high">Price: High to Low</option>
//       </select>
//       <div className="grid-container">
//         {sortItems(items).map((item, index) => (
//           <div
//             onClick={() => handleCardClick(index)}
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseLeave={handleMouseLeave}
//             key={item.title}
//             className="card"
//           >
//             <img src={item.img.url} alt={item.title} className="card-image" />
//             <div className='counter-box'>
//               {hoveredIndex === index && <Counter item={item} count={countStates[index]} onCountChange={(count) => handleCountChange(index, count)} />}
//             </div>
           
//             <div className="card-content">
//               <h3 className="card-title">{item.title}</h3>
//               <p className="card-price">{item.price} &#8362;/{item.unit} </p>
//             </div>
            
//             {modal === index && (
//               <ProductDetails item={item} closeModal={handleCardClick} />
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default CardComponent;


//Counter with add to cart (only add)
// import { useContext } from "react";
// import './counter.css'
// import { GeneralContext } from "../../App";
// const Counter = ({ count, onCountChange,item }) => {
//     const { setUser,cart,setCart } = useContext(GeneralContext);

//     const addToCart = async () => {
//         try {
//             const response = await fetch(`http://localhost:4000/cart/add/${item._id}`, {
//                 credentials: "include",
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                     "Authorization": localStorage.token,
//                 },
//                 // Pass quantity only if it's provided, else let the backend handle the default
//                 body: JSON.stringify({ quantity: item.quantity ? item.quantity : "" }),
//             });
//             console.log("Response status:", response.status);
//             const data = await response.json();
//             console.log("Response data:", data);
//             if (response.ok) {
//                 setCart(data);
//             } 
//         } catch (error) {
//             console.error("Error adding product:", error);
//         }
//     }
//     const handleIncrement = (ev) => {
//         ev.stopPropagation();
//         onCountChange(count + 1);
//         addToCart();
//     };
  
//     const handleDecrement = (ev) => {
//         if (count <= 0) {
//           return; // Do nothing if count is already 0 or negative
//         }
//         ev.stopPropagation();
//         onCountChange(count - 1);
//       };
//     return (
//       <div className="counter">
//         <button className="counter-btn" onClick={handleDecrement}>-</button>
//         <p>{count}</p>
//         <button className="counter-btn" onClick={handleIncrement}>+</button>
//       </div>
//     );
//   };
  
//   export default Counter;