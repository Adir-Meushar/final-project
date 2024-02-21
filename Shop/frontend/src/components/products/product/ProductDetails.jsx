import { useContext, useState } from 'react';
import './product-details.css';
import { GeneralContext } from '../../../App';

function ProductDetails({item,closeModal}) {
  const { setUser,cart,setCart } = useContext(GeneralContext);
  const addToCart = async () => {
    try {
        const response = await fetch(`http://localhost:4000/cart/add/${item._id}`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token,
            },
            // Pass quantity only if it's provided, else let the backend handle the default
            body: JSON.stringify({ quantity: item.quantity ? item.quantity : "" }),
        });
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
        if (response.ok) {
            setCart(data);
            closeModal(null)
        } 
    } catch (error) {
        console.error("Error adding product:", error);
    }
}
    return (
        <div className="modal-frame-details">
                <div className='product-details'>
                  <button className='close-btn' onClick={(ev) => {closeModal(null);ev.stopPropagation()}}>&times;</button>
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
                  <button onClick={addToCart} className='add-btn'>Add to Cart</button>
                </div>
              </div>
    )
}

export default ProductDetails
