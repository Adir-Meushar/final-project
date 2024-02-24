import { useEffect, useState } from "react"
import Products from "../product/Products";
import './category.css'
function Vegetables() {
    const [vegetables, setVegetables] = useState([]);
    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/vegetables', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const vegetablesData = await response.json();
                setVegetables(vegetablesData);
                console.log(vegetablesData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchVegetables();
    }, [])



    return (
        <div>
            <div className="category-container">
                {/* <div className="first-img"><img src="https://i.pinimg.com/236x/ba/3b/44/ba3b4427739f19051099a6de13655078.jpg" alt="first-img" /></div> */}
                <div className="cover-title">
                    <h1>Our Vegetables</h1>
                    <p>An enormous variety of fresh, high-quality, and delicious vegetables, delivered straight to us every morning from the finest farmers in the country with fast home delivery.</p>
                </div>
                {/* <div className="seconed-img"><img src="https://i.pinimg.com/236x/0d/52/f4/0d52f4621c208f9b7371fef45e787059.jpg" alt="seconed-img" /></div> */}
            </div>
            <Products items={vegetables} />
        </div>
    )
}

export default Vegetables
