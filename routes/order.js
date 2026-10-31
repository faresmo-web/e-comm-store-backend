const express = require("express");
const router = express.Router();
const Order = require("../db/order");

const { getOrders, updateOrderStatus } = require("../handlers/order-handler");

router.get("/", async (req, res) => {
    let orders = await getOrders();
    res.send(orders);
});

router.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await updateOrderStatus(id, status);
        res.send({ message: "Status updated successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message || "Failed to update status" });
    }
});

module.exports = router;
