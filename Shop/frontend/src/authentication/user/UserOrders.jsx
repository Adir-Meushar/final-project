import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import moment from 'moment'; // Import moment

function UserOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { snackbar, setLoader, user } = useContext(GeneralContext);
    const currentDate = Date.now();

    useEffect(() => {
        const getMyOrders = async (userId) => {
            try {
                const response = await fetch(`http://localhost:4000/orders/my-orders/${userId}`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });
                const data = await response.json();
                setMyOrders(data);
                console.log(data);

                if (data.error) {
                    console.log(data.error);
                } else {
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        };
        getMyOrders(user._id);
    }, []);

    const handleOrderClick = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm(`Are you sure you want to cancel this order?`)) {
            return;
        } else {
            try {
                const response = await fetch(`http://localhost:4000/orders/delete/${orderId}`, {
                    credentials: "include",
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });
                const data = await response.json();
                if (data.error) {
                    console.log(data.error);
                }else{
                    setMyOrders(myOrders.filter((order) => order._id !== orderId));
                }
            } catch (error) {
                console.error("Error deliting order:", error);
            }
        }
    }
    const isOrderCancelable = (deliveryDate) => {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
        const parsedDeliveryDate = moment(deliveryDate, 'DD-MM-YYYY').toDate(); // Parse deliveryDate into a Date object
        const differenceInDays = (parsedDeliveryDate.getTime() - currentDate) / oneDayInMilliseconds;
        console.log("Difference in days:", differenceInDays);
        return differenceInDays > 1; // Returns true if deliveryDate is more than one day away
    };
    console.log(user);
    return (
        <div className="user-orders">
            <h1>User Orders</h1>
            Total orders: {myOrders.length}
            <div className="orders-box" >
                {myOrders && myOrders.length > 0 ? (
                    myOrders.map((order) => (
                        <div key={order._id} className={`order ${expandedOrder === order._id ? 'expanded' : ''}`}
                            onClick={() => handleOrderClick(order._id)}>
                            <div className="order-info">
                                <div className="order-number">Order Number: {order._id}</div>
                                <div className="total-price">Total Price: {order.totalPrice}&#8362;</div>
                                <div >Delivery Schedule: {order.deliveryDate}</div>
                                <div className="created-time">Created Time: {order.createdTime}</div>
                                {isOrderCancelable(order.deliveryDate) && <button onClick={() => deleteOrder(order._id)}>Cancel</button>}

                            </div>
                            {expandedOrder === order._id && (
                                <>
                                    <h3>Items:</h3>
                                    <div className="items">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="item">
                                                <div className="item-name">Name: {item.productName}</div>
                                                <div className="item-price">Price: {item.sale === false ? item.price : item.finalPrice}&#8362;/{item.unit}</div>
                                                <div className="item-quantity">Quantity: {item.quantity}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-orders">No orders available</div>
                )}
            </div>
        </div>
    )
}

export default UserOrders;
