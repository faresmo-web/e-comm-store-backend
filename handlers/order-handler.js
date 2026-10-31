const Order = require("../db/order");
const Cart = require("../db/cart");

async function addOrder(userId, orderModel) {
    let order = new Order({
        ...orderModel,
        userId: userId,
        status: "InProgress",
        date: new Date()
    });
    await order.save();
    // Clear user cart after placing order
    await Cart.deleteMany({ userId: userId });
    return order;
}

async function getCustomerOrders(userId) {
    let orders = await Order.find({ userId: userId }).sort({ date: -1 });
    return orders;
}

async function getOrders() {
    let orders = await Order.find().sort({ date: -1 });
    return orders;
}

async function updateOrderStatus(id, status) {
    await Order.findByIdAndUpdate(id, { status: status });
}

module.exports = {
    addOrder,
    getCustomerOrders,
    getOrders,
    updateOrderStatus
};

