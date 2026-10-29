const express = require("express");
const router = express.Router();

const { getNewProducts, getFeaturedProducts, getProductForListing } = require("../handlers/product-handler");
const { getCategory } = require("../handlers/category-handlers");
const { getBrands } = require("../handlers/brand-handler");
const { getProductById } = require("../handlers/product-handler")
const { getWishlist, addToWishlist, removeFromWishlist } = require("../handlers/wishlist-handlers")
const { verifyToken } = require("../middleware/auth-middleware")

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

router.get("/brands",  async (req, res) => {
    const brands = await getBrands();
    res.send(brands);
})


router.get("/products",  async (req, res) => {
    const {searchQuery, categoryId, sortBy, sortOrder, brandId, pageSize,page} = req.query;
    const products = await getProductForListing(
        searchQuery, 
        categoryId,
        page,
        pageSize,
        sortBy, 
        sortOrder,
        brandId,
       
    );
    res.send(products);
})

router.get("/products/:id", async (req, res) => {
    const id = req.params["id"]
    const  products = await getProductById(id);
    res.send(products)
})
router.get("/wishlists", verifyToken, async (req, res) => {
    const userId = req.user.id
    const item = await getWishlist(userId)
    res.send(item)
})

router.post("/wishlists/:id", verifyToken, async (req, res) => {
    const userId = req.user.id
    const productsId = req.params.id
    const item = await addToWishlist(userId, productsId)
    res.send(item)
})
router.delete("/wishlists/:id", verifyToken, async (req, res) => {
    const userId = req.user.id
    const productsId = req.params.id
    await removeFromWishlist(userId,productsId );
    res.send({message: "ok"});
})

module.exports = router;