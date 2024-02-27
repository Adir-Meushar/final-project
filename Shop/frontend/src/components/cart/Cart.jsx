import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { BsTrash3 } from "react-icons/bs";
import Counter from '../counter/Counter';
import { GeneralContext } from '../../App';

function Cart() {
    const [cartModal, setCartModal] = useState(false);
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-cart.png';
    const { count, setCount,cartProducts, setCartProducts } = useContext(GeneralContext);

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
        if (updatedCart[index].quantity <= 0) {
            // If quantity becomes zero or negative, remove the item from the cart
            updatedCart.splice(index, 1);
        }
        setCartProducts(updatedCart);
        // Update cart in local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
   const clearCart=()=>{
    localStorage.removeItem('cart')
    setCartProducts([])
    setCount(0)
   }
    return (
        <>
            <img onClick={() => { setCartModal(true); }}
                className="cart-img" src={cartImg} alt="Cart" />
            {cartModal && (
                <div className="modal-frame">
                    <div className='cart'>
                        <button className='close-btn' onClick={() => { setCartModal(false) }}>&times;</button>
                        <div className='cart-header'>
                            <div>
                                <h1>My Cart</h1>
                                <div>Items:{cartProducts.length}</div>
                            </div>
                            <BsTrash3 onClick={clearCart} className='cart-trash' />
                        </div>
                        {cartProducts.length > 0 ? (
                            <>
                                <div>{cartProducts.map((cartItem, index) => (
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
                        ) : <p className='empty-cart-msg'>Your cart is empty...</p>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart;