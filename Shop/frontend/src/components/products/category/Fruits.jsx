import { useEffect, useState } from "react"
import CardComponent from "../Card";

function Fruits() {
    const [fruits, setFruits] = useState([]);
    useEffect(() => {
        const fetchFruits = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/fruits', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fruitsData = await response.json();
                setFruits(fruitsData);
                console.log(fruitsData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchFruits();
    }, [])



    return (
        <div>
            <h1>Fruits</h1>
          <CardComponent items={fruits}/>
        </div>
    )
}

export default Fruits
