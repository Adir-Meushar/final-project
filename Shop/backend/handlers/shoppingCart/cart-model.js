const mongoose = require('mongoose');
const moment = require('moment');

const cartItemSchema=new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName:{type:String,required:true},
    quantity: { type: Number, default: 1 },
});

const shoppingCartSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items:[cartItemSchema],
    createdTime: { type: String, default: () => moment().format('D-M-Y HH:mm:ss') }
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart; 