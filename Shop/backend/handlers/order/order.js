const guard = require('../helpers/guard');
const { getUserInfo } = require('../helpers/jwtUtils');
const { Product } = require('../products/product-model');
const Order = require('./order-model');

module.exports = app => {
    app.post('/orders/create', guard, async (req, res) => {
        try {
            const userToken = getUserInfo(req, res);
            if (!userToken) {
                return res.status(401).send({
                    error: { 
                        code: 401,
                        message: 'Unauthorized',
                        details: 'User authentication failed.',
                    },
                });
            }

            const cart = req.body.cart;

            if (!Array.isArray(cart) || cart.length === 0) {
                return res.status(400).send({ error: 'Cart is empty or invalid' });
            }

            const items = [];

            // Iterate over each item in the cart
            for (const item of cart) {
                const { id, quantity } = item;
                console.log("Product ID:", id); // Log id

                const product = await Product.findById(id);

                if (!product) {
                    return res.status(404).send({ error: `Product with ID ${id} not found` });
                }

                items.push({
                    product: id,
                    productName: product.title,
                    quantity: quantity,
                    price:product.price,
                    finalPrice:product.finalPrice,
                    sale:product.sale
                });
            }
            const totalPricePromise = Promise.all(items.map(async (item) => {
                const product = await Product.findById(item.product);
            
                // If the product has a sale, calculate the total price using the final price
                if (product.sale) {
                    return product.finalPrice * item.quantity;
                } else {
                    return product.price * item.quantity;
                }
            }));
            
            // Wait for all promises to resolve
            const totalPriceArray = await totalPricePromise;
            
            // Sum up the total price
            const totalPrice = totalPriceArray.reduce((acc, price) => acc + price, 0);
            const order = new Order({
                user: userToken.userId,
                items: items,
                totalPrice: totalPrice,
            });

            await order.save();
            res.status(200).send(order);

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error creating order' });
        }
    });

    // app.get('/orders/my-order',guard ,async(req,res)=>{
    //     try{
    //         const userToken = getUserInfo(req, res);
    //         if (!userToken) {
    //             return res.status(401).send({
    //                 error: { 
    //                     code: 401,
    //                     message: 'Unauthorized',
    //                     details: 'User authentication failed.',
    //                 },
    //             });
    //         }
    //         const myOrders=
    //     }catch(error){

    //     }
    // })
}
