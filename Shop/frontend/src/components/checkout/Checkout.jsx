import React, { useContext, useState } from 'react';
import { GeneralContext } from '../../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
import './checkout.css'
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const { cartProducts, setCartProducts, snackbar } = useContext(GeneralContext);
    const [deliveryDate, setDeliveryDate] = useState(Date.now());
    const navigate = useNavigate();
    const createOrder = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/order/create', {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
                body: JSON.stringify({ cart: cartProducts }),
            });

            const data = await response.json();

            if (data.error) {
                console.log(data.error);
            } else {
                console.log("Order created successfully:", data);
                setCartProducts([]);
                localStorage.removeItem('cart');
                navigate('/');
                snackbar('Your order has been received! 🎉 We are thrilled to be preparing your items for delivery.');
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <>
            <h1>Checkout</h1>
            <form onSubmit={createOrder} className='payment-form'>
                <label>
                    card number:
                    <input type="number" />
                </label>
                <label>
                    card number:
                    <input type="number" />
                </label>

                <label>
                    cvv:
                    <input type="number" />
                </label>
                <label>
                    Expiration Date:
                    <DatePicker
                        selected={deliveryDate}
                        onChange={(date) => setDeliveryDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select delivery date"
                    />
                </label>
                <button className='payment-btn'>Order & Pay</button>
            </form>
        </>

    );
}

export default Checkout;


//payment card
//date for delivery
//user address
