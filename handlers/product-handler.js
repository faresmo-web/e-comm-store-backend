const Product = require("../db/product");

async function addProduct(model){
    let product = new Product({
        ...model
    })
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model){
    await Product.findByIdAndUpdate(id, model);
    
}

async function deleteProduct(id, model){
    await Product.findByIdAndDelete(id, model);
    
}

async function getAllProducts(){
    let products = await Product.find();
    return products.map((p) => p.toObject());
}

async function getProductById(id){
    let product = await Product.findById(id);
    return product ? product.toObject() : null;
}


async function getNewProducts(){
    let newProducts = await Product.find({isNewProduct:true});
    return newProducts.map((p) => p.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({isFeatured:true});
    return featuredProducts.map((p) => p.toObject());
}




module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getNewProducts,
    getFeaturedProducts
}