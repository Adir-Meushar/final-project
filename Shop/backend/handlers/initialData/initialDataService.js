const { Product } = require('../products/product-model');
const { vegetables, fruits } = require('./initialData.json');

const initialDataStart = async () => {
    const productAmount = await Product.find().countDocuments();
    if (!productAmount) {
        const allProducts = [...vegetables, ...fruits]; // Merge vegetables and fruits arrays
        
        for (let i = 0; i < allProducts.length; i++) {
            const product = new Product(allProducts[i]);
            await product.save();
        }
    }
};

initialDataStart();