import { useEffect, useState } from "react"
import Products from "../product/Products";

function Bakery() {
    const [bakery, setBakery] = useState([]);
    useEffect(() => {
        const fetchBakery = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/bakery', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const bakeryData = await response.json();
                setBakery(bakeryData);
                console.log(bakeryData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchBakery();
    }, [])



    return (
        <div>
         <div className="category-container">
            <img src="https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Bakery-Desktop1.jpg" alt="bakery-img"/>
                <div className="cover-title">
                    <h1>Bakery</h1>
                    <p>Freshly baked goods crafted with care from the finest ingredients, delivered swiftly to your doorstep.</p>
                </div>
            </div>
          <Products items={bakery}/>
        </div>
    )
}

export default Bakery
