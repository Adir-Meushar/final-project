const { Product } = require('../products/product-model');
const {User}=require('../user/user-model')
const { vegetables, fruits,bakery,dairyAndeggs,users } = require('./initialData.json');

const initialDataStart = async () => {
    const userAmount=await User.find().countDocuments();
    const productAmount = await Product.find().countDocuments();
    if (!productAmount) {
        const allProducts = [...vegetables, ...fruits,...bakery,...dairyAndeggs]; // Merge vegetables and fruits arrays
        
        for (let i = 0; i < allProducts.length; i++) {
            const product = new Product(allProducts[i]);
            await product.save();
        } 
    }
    if (!userAmount) {
        // No users found, add users from the initial data file
        for (let i = 0; i < users.length; i++) {
            const userData = users[i];
            const user = new User(userData);
            await user.save();
        }
    }
};

initialDataStart(); 