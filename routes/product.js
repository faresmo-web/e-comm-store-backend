const express = require("express");
const router = express.Router();
const Category = require("../db/product");

const {addProduct , updateProduct, deleteProduct, getAllProducts, getProductById} = require("../handlers/product-handler");


router.post("", async (req, res) => {
    let model = req.body;
    let product = await addProduct(model);
    res.send(product);
})

router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params["id"];
    await updateProduct(id, model);
    res.send({ message: "Product updated successfully" });
})

router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    await deleteProduct(id);
    res.send({ message: "Product deleted successfully" });
})
router.get("/", async (req, res) => {
    
    let product = await getAllProducts();
    res.send(product);
})

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let products = await getProductById(id);
    res.send(products);
})

module.exports = router;