import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { BsTrash3 } from "react-icons/bs";
import Counter from '../counter/Counter';
import { GeneralContext } from '../../App';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartModal, setCartModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-cart.png';
    const { count, setCount, cartProducts, setCartProducts } = useContext(GeneralContext);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            // If cart exists in local storage, parse it and set it to state
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);
    useEffect(() => {
        let total = 0;
        cartProducts.forEach(item => {
            total += item.sale ? item.finalPrice * item.quantity : item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cartProducts]);

    const handleQuantityChange = (index, value) => {
        // Update the quantity of the item at the given index
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity += value;
        if (updatedCart[index].quantity <= 0) {
            // If quantity becomes zero or negative, remove the item from the cart
            updatedCart.splice(index, 1);
        }
        setCartProducts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const clearCart = () => {
        localStorage.removeItem('cart')
        setCartProducts([])
    }

    console.log(totalPrice);
    console.log(cartProducts);
    return (
        <>
            <img onClick={() => { setCartModal(true); }}
                className="cart-img" src={cartImg} alt="Cart" />
            {cartModal && (
                <div className="modal-frame" onClick={() => { setCartModal(false) }}>
                    <div className="cart"  onClick={(ev) => ev.stopPropagation()}>
                        <button className="close-btn" onClick={() => { setCartModal(false) }}>&times;</button>
                        <div className="cart-header">
                            <div>
                                <h1>My Cart</h1>
                                <div>Items: {cartProducts.length}</div>
                                <div>Total:{totalPrice.toFixed(2)}&#8362;</div>
                            </div>
                            <BsTrash3 onClick={clearCart} className="cart-trash" />
                        </div>
                        {cartProducts.length > 0 ? (
                            <>
                                <div className="cart-products">
                                    {cartProducts.map((cartItem, index) => (
                                        <div key={index} className="cart-card">
                                            <img className="cart-item-img" src={cartItem.img} />
                                            <div>{cartItem.title}</div>

                                            <div>{cartItem.quantity}{cartItem.unit}</div>
                                            {/* <div>{cartItem.price}&#8362;/{cartItem.unit}</div> */}
                                            <div>
                                                {cartItem.sale ? (
                                                    Number((cartItem.finalPrice * cartItem.quantity).toFixed(2))
                                                ) : (
                                                    Number((cartItem.price * cartItem.quantity).toFixed(2))
                                                )}
                                                &#8362;
                                            </div>
                                            <Counter count={cartItem.quantity} onChange={(value) => handleQuantityChange(index, value)} />
                                        </div>
                                    ))}
                                </div>
                                <p className={totalPrice > 50 ? 'remove-message' : 'minimum-message'}>*Please note min cost for delivery 50&#8362;*</p>
                                <div className={'cart-payout ' + (cartProducts.length > 7 ? "cart-payout-sticky" : "cart-payout-fixed")}>
                                    <Link to={'/checkout'}><button disabled={totalPrice < 50} onClick={() => setCartModal(false)} >Go To Checkout</button></Link>
                                </div>
                            </>
                        ) : <div className='empty-cart-msg'>
                            <p >Your cart is empty...</p>
                            <img className='empty-cart-img' src="https://i.pinimg.com/564x/b7/4e/21/b74e214472d9ee763f2613ae280f96d2.jpg" alt="sad-emo" />
                        </div>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart;