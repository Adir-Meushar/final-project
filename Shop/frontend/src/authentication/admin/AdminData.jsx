import { useEffect, useState } from "react"

function AdminData() {
    const [productsAmount, setProductsAmount] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/dashboard/products/amount', {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });
                const data = await response.json();
                setProductsAmount(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
      
          <div>
            {productsAmount}
          </div>
         
    
    )
}

export default AdminData
