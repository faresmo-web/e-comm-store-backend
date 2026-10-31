const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: Array,
    paymentType: String,
    address: Object,
    totalAmount: Number,
    status: {
        type: String,
        default: "InProgress"
    }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
