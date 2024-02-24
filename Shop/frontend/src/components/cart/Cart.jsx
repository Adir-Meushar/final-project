import  { useEffect, useState } from 'react';
import './cart.css';

import Counter from '../counter/Counter';

function Cart() {
    const [cartModal, setCartModal] =useState(false);
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-cart.png';
    const [cartProducts,setCartProducts]=useState([]);

    useEffect(() => {
        // Retrieve cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            // If cart exists in local storage, parse it and set it to state
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);
    const handleQuantityChange = (index, value) => {
        // Update the quantity of the item at the given index
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity += value;
        setCartProducts(updatedCart);
        // Update cart in local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    return (
        <>
            <img onClick={() => { setCartModal(true); }}
                className="cart-img" src={cartImg} alt="Cart" />
            {cartModal && (
                <div className="modal-frame">
                    <div className='cart'>
                        <button className='close-btn' onClick={() => { setCartModal(false) }}>&times;</button>
                        <h1>Your Cart</h1>
                        {cartProducts.length > 0 ? (
                            <>
                                <div>{cartProducts.map((cartItem,index) => (
                                    <div key={index} className='cart-card'>
                                        <div>{cartItem.quantity}{cartItem.unit}</div>
                                        <div>{cartItem.title}</div>
                                        <img className='cart-item-img' src={cartItem.img} />
                                        {/* <div>{cartItem.price}&#8362;/{cartItem.unit}</div> */}
                                        <div>total: {Number((cartItem.price * cartItem.quantity).toFixed(2))}&#8362;</div>
                                        <Counter count={cartItem.quantity} onChange={(value) => handleQuantityChange(index, value)} />
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