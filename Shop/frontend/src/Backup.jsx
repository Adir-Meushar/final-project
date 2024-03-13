// import React, { useContext, useState } from 'react';
// import { GeneralContext } from '../../App';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
// import './checkout.css'
// import { useNavigate } from 'react-router-dom';
// import { checkoutSchema } from './checkoutValid';
// function Checkout() {
//     const { cartProducts, setCartProducts, snackbar } = useContext(GeneralContext);
//     const [deliveryDate, setDeliveryDate] = useState(Date.now());
//     const navigate = useNavigate();

//     const createOrder = async (ev) => {
//         ev.preventDefault();
//         if(cartProducts.length==0){
//             return snackbar('cart is empty')
//         }
//         try {
//             const response = await fetch('http://localhost:4000/order/create', {
//                 credentials: "include",
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json",
//                     "Authorization": localStorage.token,
//                 },
//                 body: JSON.stringify({ cart: cartProducts }),
//             });
//             const data = await response.json();
//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 console.log("Order created successfully:", data);
//                 setCartProducts([]);
//                 localStorage.removeItem('cart');
//                 navigate('/');
//                 snackbar('Your order has been received! 🎉 We are thrilled to be preparing your items for delivery.');
//             }
//         } catch (error) {
//             console.error("Error creating order:", error);
//         }
//     };

//     return (
//         <>
//             <form onSubmit={createOrder} className='payment-form'>
//                 <h1>Checkout</h1>
//                 <label>
//                     card number:
//                     <input type="number" className='card-details' />
//                 </label>
//                 <label>
//                     card number:
//                     <input type="number" className='card-details' />
//                 </label>
//                 <label>
//                     cvv:
//                     <input type="number" className='card-details' />
//                 </label>
//                 <label>
//                     Expiration Date:
//                     <DatePicker
//                         selected={deliveryDate}
//                         onChange={(date) => setDeliveryDate(date)}
//                         dateFormat="MM/dd/yyyy"
//                         placeholderText="Select delivery date"
//                     />
//                 </label>
//                 <button className='payment-btn'>Order & Pay</button>
//             </form>
//         </>
//     );
// }

// export default Checkout;

// //card-details//
// //choose delivery date//
// //msg for current savesd address//
// //total sum to pay//
// .payment-form {
//     text-transform: capitalize;
//     margin: 10px;
//     padding: 20px 0 0 0;
//     border-radius: 5px;
//     width: 35vw;
//     min-width: 450px;
//     height: 55vh;
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 20px; /* Added gap between grid items */
//     background-color: #fff;
// }
// .payment-form h1{
//     grid-column: span 2;
// }
// .payment-btn {
//     grid-column: span 2; /* Button spans across 2 columns */
//     justify-self: end;
//     align-self: flex-end; /* Aligns button to the end of the grid */
//     width: 100%;
//     height: 35px;
//     border-radius: 5px;
//     background-color: rgb(46, 122, 222);
//     color: white;
//     font-size: 1rem;
//     border: none;
// }
//   .card-details::-webkit-inner-spin-button,
//   .card-details::-webkit-outer-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }
  


//NOTES//
// note searchbar=101vw//