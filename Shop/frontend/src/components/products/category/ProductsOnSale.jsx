import { useContext, useEffect, useState } from "react"
import Products from "../product/Products";
import { GeneralContext } from "../../../App";


function ProductsOnSale() {
    const [productsOnSale, setProductsOnSale] = useState([]);
    const{setLoader,isDarkMode,isSmallScreen}=useContext(GeneralContext) 
    useEffect(() => {
        const fetchProducts = async () => {
            setLoader(true)
            try {
                const response = await fetch('http://localhost:4000/products/sale', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json"}
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productsData = await response.json();
                setProductsOnSale(productsData);
                console.log(productsData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setTimeout(() => {
                setLoader(false);
              }, 1000);
        }
        fetchProducts();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}>
          <div className='category-container'>
            <img src={isSmallScreen?'https://noyhasade.b-cdn.net/wp-content/uploads/2023/06/MOB-_-category-_-health.jpg':"https://noyhasade.b-cdn.net/wp-content/uploads/2023/06/DES-_-category-_-health.jpg"} alt="health-img"/>
                <div className="cover-title">
                    <h1>Welcome!</h1>
                    <p>Discover a wide variety of fresh and flavorful products, ranging from farm-fresh vegetables and juicy fruits to delectable bakery treats and more.</p>
                </div>
            </div>
          <Products items={productsOnSale}/>
        </div>
    )
}

export default ProductsOnSale