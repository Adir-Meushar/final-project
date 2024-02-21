import { useEffect, useState } from "react"
import CardComponent from "../product/Card";

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
            <h1>Bakery</h1>
          <CardComponent items={bakery}/>
        </div>
    )
}

export default Bakery
