const mongoose = require('mongoose');
const moment = require('moment');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price:Number,
    }],
    totalPrice: { type: Number, required: true, set: v => Math.floor(v) },
    createdTime: { type: String, default: () => moment().format('D-M-Y HH:mm:ss') }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;