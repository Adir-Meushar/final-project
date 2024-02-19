import { useEffect, useState } from "react"
import CardComponent from "../product/Card";

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
            <h1>Vegetables</h1>
          <CardComponent items={vegetables}/>
        </div>
    )
}

export default Vegetables
