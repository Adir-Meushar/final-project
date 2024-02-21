const ShoppingCart = require("./cart-model");
const guard = require('../helpers/guard');
const { Product } = require("../products/product-model");
const { getUserInfo } = require("../helpers/jwtUtils");
const { RoleType } = require("../user/user-model");

module.exports = app => {
    //Add to Cart||Permissions:Admin,User//
    app.post('/cart/add/:id', guard, async (req, res) => {
        try {
            const productId=req.params.id;
            const { quantity } = req.body;
            const finalQuantity = quantity ? parseInt(quantity) : 1;

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
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send({ error: 'Product not found' });   
            } 
            const { title: productName, price: productPrice, img: { url: productImg }, unit } = product;

          
            let cart = await ShoppingCart.findOne({ user: userToken.userId });
            if (!cart) { 
                cart = new ShoppingCart({ user: userToken.userId, items: [] }); 
            } 
            const existingItem = cart.items.find(item => item.product.equals(productId));
            if (existingItem) { 
                existingItem.quantity += finalQuantity;
            } else {
                cart.items.push({ product: productId, productName, productPrice, productImg, quantity: finalQuantity,unit });
            }
            await cart.save();
            res.status(200).send(cart.items);
        } catch (error) {
            res.status(500).send({ error: 'Error adding item to cart' });
            
        }
    });

    //View Cart||Permissions:User//
    app.get('/cart/view',guard,async(req,res)=>{
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
            };
            const cart=await ShoppingCart.findOne({user:userToken.userId});
            if (!cart) {
                return res.status(404).send({ error: 'Cart not found' });
            }
            res.status(200).send(cart.items);
        } catch(error){
            res.status(500).send({ error: 'Error retrieving cart' });
        }

     })

    //Delete Cart||Permissions:User//
     app.delete('/cart/clear',guard,async(req,res)=>{
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
            };
            
            const userCart = await ShoppingCart.findOneAndDelete({ user: userToken.userId });
            if (!userCart) {
                return res.status(404).send({ error: 'Cart not found' });
            }
            res.status(200).send({
                message:`Cart was deleted sucssesfully!`,
                deletedCart:userCart,
              });

        }catch(error){
            res.status(500).send('Error Deleting Cart');
        }
     })

     //Edit Cart||Permissions:User//
     app.put('/cart/update/:productId', guard, async (req, res) => {
        try{
            const {productId}=req.params;
            const {quantity}=req.body;
            const userToken = getUserInfo(req, res);
            if (!userToken) {
                return res.status(401).send({
                    error: {
                        code: 401,
                        message: 'Unauthorized',
                        details: 'User authentication failed.',
                    },
                });
            };
            const userCart = await ShoppingCart.findOne({ user: userToken.userId });
            if (!userCart) {
                return res.status(404).send({ error: 'Cart not found' });
            }
            const cartItemIndex=userCart.items.findIndex(item=>item.product.equals(productId));
            if (cartItemIndex === -1) {
                return res.status(404).send({ error: 'Item not found in cart' });
            }
            if(quantity===0){
              userCart.items.splice(cartItemIndex,1);
            }else{
                userCart.items[cartItemIndex].quantity=quantity;
            }
            await userCart.save();
            res.status(200).send(userCart);
        } catch (error) {
            res.status(500).send({ error: 'Error updating cart' });
        }
    });
};
