const express = require("express");
const router = express.Router();

const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const { getCategory } = require("../handlers/category-handlers");

router.get("/new-products",  async (req, res) => {
    const products = await getNewProducts();
    res.send(products);
})

router.get("/featured-products",  async (req, res) => {
    const products = await getFeaturedProducts();
    res.send(products);
})
router.get("/categories",  async (req, res) => {
    const categpries = await getCategory();
    res.send(categpries);
})


module.exports = router;