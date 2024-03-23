import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";

function UserOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { snackbar, setLoader, user } = useContext(GeneralContext);

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

    console.log(user);
    return (
        <div className="user-orders">
            <h1>User Orders</h1>
            Total orders: {myOrders.length}
            <div >
                {myOrders && myOrders.length > 0 ? (
                    myOrders.map((order) => (
                        <div key={order._id} className={`order ${expandedOrder === order._id ? 'expanded' : ''}`}
                            onClick={() => handleOrderClick(order._id)}>
                            <div className="order-info">
                                <div className="order-number">Order Number: {order._id}</div>
                                <div className="total-price">Total Price: {order.totalPrice}&#8362;</div>
                                <div className="created-time">Created Time: {order.createdTime}</div>
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
