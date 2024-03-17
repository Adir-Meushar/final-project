import { useState, useEffect, useContext } from 'react';
import Counter from '../../counter/Counter';
import ProductDetails from './ProductDetails';
import { GeneralContext } from '../../../App';

function ProductCard({ item }) {
    const [modal, setModal] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [count, setCount] = useState(0); 
    const {user,cartProducts, setCartProducts,isDarkMode}=useContext(GeneralContext)
    
    useEffect(() => {
      if (item) {
        const foundItemIndex = cartProducts.findIndex(product => product.id === item._id);
        if (foundItemIndex !== -1) {
          const foundItem = cartProducts[foundItemIndex];
          if (foundItem.quantity > 0) {
            setCount(foundItem.quantity);
            console.log(foundItem);
          } else {
            // Remove item from cartProducts
            const newCartProducts = [...cartProducts]; // Create a copy of the cartProducts array
            newCartProducts.splice(foundItemIndex, 1); // Remove the item at foundItemIndex
            setCartProducts(newCartProducts); // Update cartProducts state
          }
        }
      }
    }, [cartProducts, item]);
    

    const handleCardClick = () => {
      setModal(true);
    };
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    const handleCountChange = (value) => {
        const newCount = count + value;
        if (newCount >= 0) {
            setCount(newCount);
            updateCart(
                item._id, 
                newCount, 
                item.price, 
                item.title, 
                item.img.url, 
                item.unit
            );
        }
    };

    const updateCart = (productId, quantity, price, title, imgUrl, unit) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemIndex = cart.findIndex(item => item.id === productId);
        if (cartItemIndex !== -1) {
            cart[cartItemIndex].quantity = quantity;
        } else {
            cart.push({ 
                id: productId, 
                quantity: quantity,
                price: price,
                title: title,
                img: imgUrl,
                unit: unit
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(cart)
    };

    return (
      <div
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="card"
      >
        <img src={item.img.url} alt={item.title} className="card-image" />
        <div className="counter-box">
          {user?hovered &&  (
            <Counter count={count} onChange={handleCountChange} />
          ):''}
        </div>
  
        <div className={`card-content ${isDarkMode ? 'dark' : 'light'}`}>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-price">
            {item.price}0 &#8362;/{item.unit}
          </p>
        </div>
  
        {modal && <ProductDetails setCount={setCount} item={item} closeModal={() => setModal(false)} />}
      </div>
    );
}

export default ProductCard;