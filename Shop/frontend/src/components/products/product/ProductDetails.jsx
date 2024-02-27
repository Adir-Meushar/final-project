import { useContext } from 'react';
import { GeneralContext } from '../../../App';
import './product-details.css';

function ProductDetails({ item, closeModal,setCount }) {
  const {user,cartProducts, setCartProducts}=useContext(GeneralContext)

  const handleAddToCart = () => {
    if(!user){
      return alert('please login to purchase..')
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemIndex = cart.findIndex(cartItem => cartItem.id === item._id);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity += 1;
    } else {
      cart.push({
        id: item._id,
        quantity: 1,
        price: item.price,
        title: item.title,
        img: item.img.url,
        unit: item.unit
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update count state
    const updatedCartItem = cart.find(cartItem => cartItem.id === item._id);
    setCount(updatedCartItem ? updatedCartItem.quantity : 0);
    setCartProducts(cart)
  };
  
  return (
    <div className="modal-frame-details">
      <div className='product-details'>
        <button className='close-btn' onClick={(ev) => { closeModal(false); ev.stopPropagation() }}>&times;</button>
        <h1>{item.title} </h1>
        <div className='content'>
          <div className='img-box'>
            <img src={item.img.url} alt={item.title} className="product-image" />
          </div>
          <div className='details-box'>
            <div className='price'>{item.price}&#8362;/{item.unit}</div>
            <p>{item.description}</p>
            <table>
              <thead>
                <tr>
                  <th>Calories</th>
                  <th>Carbohydrate</th>
                  <th>Protein</th>
                  <th>Fat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.nutritionalValue.calories}</td>
                  <td>{item.nutritionalValue.carbohydrates}</td>
                  <td>{item.nutritionalValue.protein}</td>
                  <td>{item.nutritionalValue.fat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={(ev) => {
            ev.stopPropagation(); 
            handleAddToCart(); 
            closeModal(false); 
          }}
          className='add-btn'
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
