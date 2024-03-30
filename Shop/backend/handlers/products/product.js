const guard=require('../helpers/guard');
const { getUserInfo } = require('../helpers/jwtUtils');
const { RoleType } = require('../user/user-model');
const{Product}=require('./product-model');
const { productValidationSchema, editProductValidationSchema } = require('./productValidation');

module.exports=app=>{
    //Create Product||Permissions:Admin//
    app.post('/products', guard, async (req, res) => {
    const userToken = getUserInfo(req, res);
    if (userToken.isAdmin != RoleType.admin) {
        return res.status(401).send({
            error: {
                code: 401,
                message: 'Unauthorized',
                details: 'User authentication failed.',
            },
        });
    }
    const { category, title, description, price, sale, nutritionalValue, img, unit } = req.body;

    const { error, value } = productValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }

    try {
        const existingProduct = await Product.findOne({ title }).get({ getters: true });

        if (existingProduct) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        const product = new Product({
            category,
            title,
            description,
            price,
            sale,
            nutritionalValue,
            img,
            unit
        });

        const newProduct = await product.save();
        res.status(200).send(newProduct);
    } catch (error) {
        res.status(500).send({ error: 'Error creating product' });
    }
});

// Edit Product || Permissions: Admin//
app.put('/products/:id', guard, async (req, res) => {
    try {
        // Ensure user is an admin
        const userToken = getUserInfo(req, res);
        if (userToken.isAdmin !== RoleType.admin) {
            return res.status(401).send({
                error: {
                    code: 401,
                    message: 'Unauthorized',
                    details: 'User authentication failed.',
                },
            });
        }

        const productId = req.params.id;
        const { category, title, description, price, sale, nutritionalValue, img, unit } = req.body;

        // Check if a product with the same title already exists
        const existingProductWithTitle = await Product.findOne({ title, _id: { $ne: productId } });
        if (existingProductWithTitle) {
            return res.status(400).json({ error: 'Product with the same title already exists.' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                error: {
                    code: 404,
                    message: 'Not Found',
                    details: 'The requested product could not be found.',
                },
            });
        }

        // Validate the request body
        const { error, value } = editProductValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) });
        }

        // Update product fields
        product.set({
            category,
            title,
            description,
            price,
            sale,
            nutritionalValue,
            img,
            unit
        });

        // Save the updated product
        const updatedProduct = await product.save();
        res.send(updatedProduct);
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).send({ error: 'Error editing product' });
    }
});

    //Delete Product||Permissions:Admin//
    app.delete('/products/:id',guard,async(req,res)=>{
        const userToken=getUserInfo(req,res);
        if(userToken.isAdmin!=RoleType.admin){
            return res.status(401).send({
                error: {
                  code: 401,
                  message: 'Unauthorized',
                  details: 'User authentication failed.',
                },
              });
        }
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send({
                error: {
                  code: 404,
                  message: 'Not Found',
                  details: 'The requested product could not be found.',
                },
              });
        }
        try{
           const productToDelete=await Product.findByIdAndDelete(product);
            return res.status(200).send({
                message:`Product was deleted sucssesfully!`,
                Product:productToDelete,
              });
        }catch(error){
            res.status(500).send({ error: 'Error deleting product'});
        }
    })


    //Get One Product||Permissions:Admin//
    app.get('/product/:id',async(req,res)=>{
        try{
            const product=await Product.findById(req.params.id);
            if(!product){
                return res.status(404).send({
                    error: {
                      code: 404,
                      message: 'Not Found',
                      details: 'The requested product could not be found.',
                    },
                  });
            }
            res.status(200).send(product);
        }catch(error){
            res.status(500).send({ error: 'Error fetching product'});
        }
    })

};