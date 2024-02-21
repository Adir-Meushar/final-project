import { useContext, useState } from 'react';
import './cart.css';
import { GeneralContext } from '../../App';
import Counter from '../counter/Counter';

function Cart() {
    const [cartModal, setCartModal] = useState(false);
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-cart.png';
    const { cart,setCart } = useContext(GeneralContext);
    
    const getCartItems=async()=>{
        try{
            const response=await fetch('http://localhost:4000/cart/view',{
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
        }catch(error){
            console.error("Error fetching product:", error);
        }  

    }
 console.log(cart);

    return (
        <>
            <img onClick={() => {setCartModal(true);getCartItems();}} 
            className="cart-img" src={cartImg} alt="Cart" />
            {cartModal && (
                <div className="modal-frame">
                    <div className='cart'>
                        <button className='close-btn' onClick={() => { setCartModal(false) }}>&times;</button>
                        <h1>Your Cart</h1>
                        {cart?(
                            <>
                               <div>{cart.map((item)=>(
                                <div key={item.productName} className='cart-card'>
                                 <div>{item.quantity}</div>
                                 <div>{item.productName}</div>
                                 <img className='cart-item-img' src={item.productImg}/>
                                 <div>{item.productPrice}&#8362;/{item.unit}</div>
                                 <Counter />
                                </div>
                            ))}
                        </div>
                        <div className='cart-payout'>
                            <button>Order&Pay</button>
                        </div>
                            </>
                         
                        ):<p>Your cart is empty...</p>} 
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart
