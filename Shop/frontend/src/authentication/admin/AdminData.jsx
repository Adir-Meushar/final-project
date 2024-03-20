import { useEffect, useState } from "react";
import './admin-data-table.css'

function AdminData() {
    const [amount, setAmount] = useState({
        totalAmount: '',
        vegetablesAmount: '',
        fruitsAmount: '',
        bakeryAmount: '',
        dairyAndEggs: ''
    });

    const [priceData, setPriceData] = useState([]);
    const [productsOnSale, setProductsOnSale] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/dashboard/products/data', {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });
                const data = await response.json();
                console.log(data);
                setAmount({
                    totalAmount: data.totalAmount,
                    vegetablesAmount: data.vegetablesAmount,
                    fruitsAmount: data.fruitsAmount,
                    bakeryAmount: data.bakeryAmount,
                    dairyAndEggs: data.dairyAndEggsAmount
                });

                setPriceData(data.categoryPrices);
                setProductsOnSale(data.productsOnSale);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Data</h1>
           Total Amount: {amount.totalAmount}
           Total Users?
           {/* user role type */}
            <table className="admin-data-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Highest Price (&#8362;)</th>
                        <th>Lowest Price (&#8362;)</th>
                        <th>On Sale</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="data">Vegetables</td>
                        <td>{amount.vegetablesAmount}</td>
                        <td>{priceData.find(item => item._id === 'Vegetables')?.highestPrice}</td>
                        <td>{priceData.find(item => item._id === 'Vegetables')?.lowestPrice}</td>
                        <td>{productsOnSale['Vegetables'] || 0}</td>
                    </tr>
                    <tr>
                        <td className="data">Fruits</td>
                        <td>{amount.fruitsAmount}</td>
                        <td>{priceData.find(item => item._id === 'Fruits')?.highestPrice}</td>
                        <td>{priceData.find(item => item._id === 'Fruits')?.lowestPrice}</td>
                        <td>{productsOnSale['Fruits'] || 0}</td>
                    </tr>
                    <tr>
                        <td className="data">Bakery</td>
                        <td>{amount.bakeryAmount}</td>
                        <td>{priceData.find(item => item._id === 'Bakery')?.highestPrice}</td>
                        <td>{priceData.find(item => item._id === 'Bakery')?.lowestPrice}</td>
                        <td>{productsOnSale['Bakery'] || 0}</td>
                    </tr>
                    <tr>
                        <td className="data">Dairy & Eggs</td>
                        <td>{amount.dairyAndEggs}</td>
                        <td>{priceData.find(item => item._id === 'Dairy&Eggs')?.highestPrice}</td>
                        <td>{priceData.find(item => item._id === 'Dairy&Eggs')?.lowestPrice}</td>
                        <td>{productsOnSale['Dairy&Eggs'] || 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AdminData;
