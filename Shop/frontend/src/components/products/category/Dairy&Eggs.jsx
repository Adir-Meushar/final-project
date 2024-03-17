import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../App";
import Products from "../product/Products";

function DairyAndEggs() {
    const [dairyAndEggs, setDairyAndEggs] = useState([]);
    const{setLoader,isDarkMode}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchDairyAndEggs = async () => {
            try {
                setLoader(true)
                const response = await fetch('http://localhost:4000/products/dairy&eggs', {
                    credentials: "include",
                    method: "GET", 
                    headers: { "Content-type": "application/json", }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dairyAndEggsData = await response.json();
                setDairyAndEggs(dairyAndEggsData);
                console.log(dairyAndEggsData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setTimeout(() => {
                setLoader(false);
              }, 1000);
        }
        fetchDairyAndEggs();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="category-container">
               <img src="https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Refrigerator-milk-and-eggs-Desktop1.jpg" alt="dairy&eggs-img" />
                <div className="cover-title">
                    <h1>Dairy&Eggs</h1>
                    <p>Fresh and wonderful fruits straight from the best farmers, with fast delivery to your door. Here you will find delightful summer fruits, aromatic winter fruits and a large variety of seasonal fruits, every season.</p>
                </div>
            </div>
          <Products items={dairyAndEggs}/>
        </div>
    )
}

export default DairyAndEggs
