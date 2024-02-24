import React, { useContext, useEffect } from 'react';
import './cart.css';
import { GeneralContext } from '../../App';
import Counter from '../counter/Counter';

function Cart() {
    const [cartModal, setCartModal] = React.useState(false);
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-cart.png';
    const { cart, setCart, counts, setCounts } = useContext(GeneralContext);

    useEffect(() => {
        // Initialize counts based on cart items' quantities
        if (cart) {
            const newCounts = cart.map(cartItem => cartItem.quantity || 0);
            setCounts(newCounts);
        }
    }, [cart, setCounts]);

    const getCartItems = async () => {
        try {
            const response = await fetch('http://localhost:4000/cart/view', {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (response.ok) {
                setCart(data);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    const handleCounterChange = (index, value) => {
        const updatedCart = [...cart]; // Create a copy of the cart array
        const updatedItem = { ...updatedCart[index] }; // Create a copy of the item at the given index
        updatedItem.quantity += value; // Update the quantity of the item
        updatedCart[index] = updatedItem; // Update the item in the copied cart array
        setCart(updatedCart); // Update the cart state with the modified cart array

        // Update counts with the modified quantity
        const newCounts = [...counts];
        newCounts[index] = updatedItem.quantity;
        setCounts(newCounts);
    };

    return (
        <>
            <img onClick={() => { setCartModal(true); getCartItems(); }}
                className="cart-img" src={cartImg} alt="Cart" />
            {cartModal && (
                <div className="modal-frame">
                    <div className='cart'>
                        <button className='close-btn' onClick={() => { setCartModal(false) }}>&times;</button>
                        <h1>Your Cart</h1>
                        {cart ? (
                            <>
                                <div>{cart.map((cartItem, index) => (
                                    <div key={cartItem.productName} className='cart-card'>
                                        <div>{cartItem.productName}</div>
                                        <img className='cart-item-img' src={cartItem.productImg} />
                                        <div>{Math.floor(cartItem.productPrice * Math.round(cartItem.quantity))}&#8362;/{cartItem.unit}</div>
                                        <Counter count={counts[index]} onChange={(value) => handleCounterChange(index, value)} />
                                    </div>
                                ))}
                                </div>
                                <div className='cart-payout'>
                                    <button>Order&Pay</button>
                                </div>
                            </>
                        ) : <p>Your cart is empty...</p>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart;
