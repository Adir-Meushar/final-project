// // CardComponent.js with each card counter state
// import { useState, useEffect } from 'react';
// import './card.css';
// import ProductDetails from './ProductDetails';
// import Counter from '../../counter/Counter';

// const CardComponent = ({ items }) => {
//   const [modal, setModal] = useState(null);
//   const [sortOption, setSortOption] = useState('low');
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [counts, setCounts] = useState(new Array(items.length).fill(0)); // Initialize counts with 0 for each item

//   useEffect(() => {
//     // Ensure counts are initialized properly when items change
//     setCounts(new Array(items.length).fill(0));
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

//   const handleCounterChange = (index, value) => {
//     const newCounts = [...counts];
//     newCounts[index] += value; // Increment or decrement count for the specific item
//     setCounts(newCounts);
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
//               {hoveredIndex === index && <Counter index={index} count={counts[index]} onChange={(value) => handleCounterChange(index, value)} />}
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


// Counter.js
// import { useContext } from 'react';
// import { GeneralContext } from '../../App';
// import './counter.css';

// function Counter({ count, onChange,item }) {
//     const { cart,setCart } = useContext(GeneralContext);
//     const cartItem = cart.find(c => c.product === item?._id);
// console.log(item);
//     // Set count based on the cartItem quantity if it exists
//     const displayCount = cartItem ? cartItem.quantity : count;
  
//     const handleIncrement = (ev) => {
//       ev.stopPropagation();
//       onChange(1); // Increment count for the specific item
//     };
  
//     const handleDecrement = (ev) => {
//       ev.stopPropagation();
//       if (displayCount > 0) {
//         onChange(-1); // Decrement count for the specific item
//       }
//     };
  
//     return (
//       <div className="counter">
//         <button className="counter-btn" onClick={handleDecrement}>-</button>
//         <p>{displayCount}</p>
//         <button className="counter-btn" onClick={handleIncrement}>+</button>
//       </div>
//     );
// }

// export default Counter;


//login backup
// import { useState, useContext } from "react";
// import { GeneralContext } from "../App";

// function Login() {
//   const [modal, setModal] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { setUser } = useContext(GeneralContext);

//   const inputChange = (ev) => {
//     const { name, value } = ev.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (ev, setUser) => {
//     ev.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/users/login", {
//         credentials: "include",
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       console.log("Response status:", response.status);
//       const data = await response.json();
//       console.log("Response data:", data);
  
//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         setUser(data.user); // Update user state with fetched user data
//         setModal(false);
//         setFormData({
//           email: "",
//           password: "",
//         });
//         setErrors([]);
//       } else {
//         const errorData = JSON.parse(data);
//         setErrors(errorData.error);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setModal(false);
//     }
//   };
  
//   return (
//     <>
//       <button onClick={() => setModal(true)}>Login</button>
//       {modal && (
//         <div className="modal-frame">
//           <div className="modal">
//             <header>
//               <button
//                 className="close"
//                 onClick={() => {
//                   setModal(false);
//                   setFormData({ email: "", password: "" });
//                 }}
//               >
//                 X
//               </button>
//               <h2>Login</h2>
//             </header>
//             <form onSubmit={(e) => handleLogin(e, setUser)}>
//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="off"
//                   onChange={inputChange}
//                   value={formData.email}
//                 />
//               </label>
//               <label>
//                 Password:
//                 <input
//                   type="password"
//                   name="password"
//                   autoComplete="off"
//                   onChange={inputChange}
//                   value={formData.password}
//                 />
//               </label>
//               <button>Login</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Login;
