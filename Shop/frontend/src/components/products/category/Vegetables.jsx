import { useContext, useEffect, useState } from "react"
import Products from "../product/Products";
import './category.css'
import { GeneralContext } from "../../../App";
function Vegetables() {
    const [vegetables, setVegetables] = useState([]);
    const{setLoader,isDarkMode}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchVegetables = async () => {
            setLoader(true)
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
            setTimeout(() => {
                setLoader(false);
              }, 1000);

        }
        fetchVegetables();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : 'light'}`}> 
            <div className="category-container">
                <img src="https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Veg-Desktop1.jpg" alt="vegetables-img" />
                <div className="cover-title">
                    <h1>Vegetables</h1>
                    <p>An enormous variety of fresh, high-quality, and delicious vegetables, delivered straight to us every morning from the finest farmers in the country with fast home delivery.</p>
                </div>
            </div>
            <Products items={vegetables} />
        </div>
    )
}

export default Vegetables
