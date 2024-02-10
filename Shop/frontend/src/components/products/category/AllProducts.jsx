import { useEffect, useState } from "react"
import CardComponent from "../Card";

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/all', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productsData = await response.json();
                setProducts(productsData);
                console.log(productsData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchProducts();
    }, [])



    return (
        <div>
            <h1>Products</h1>
          <CardComponent items={products}/>
        </div>
    )
}

export default Products
