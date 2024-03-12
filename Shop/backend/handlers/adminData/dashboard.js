const guard=require('../helpers/guard');
const { Product } = require('../products/product-model');

module.exports=app=>{
    app.get('/dashboard/products/amount',guard,async(req,res)=>{
        const amount=await Product.find().countDocuments();
        res.send(amount.toString())
    })
}