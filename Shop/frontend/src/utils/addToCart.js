const addToCart = async (item, setCart) => {
    try {
        const response = await fetch(`http://localhost:4000/cart/add/${item?._id}`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token,
            },
            // Pass quantity only if it's provided, else let the backend handle the default
            body: JSON.stringify({ quantity: item?.quantity }),
        });
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
        if (response.ok) {
            setCart(data);
        } 
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

export default addToCart;