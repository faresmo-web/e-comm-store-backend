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

async function getProductForListing(searchQuery, categoryId,page,pageSize,sortBy,sortOrder, brandId){
    let queryFilter = {}
    if(!sortBy){
        sortBy = "price"
    }
    if(!sortOrder){
        sortOrder = -1
    }
    if(searchQuery){
        queryFilter.$or = [{
            name : {$regex: '.*' + searchQuery + '.*'}
        },
        {
            shotDescription : {$regex: '.*' + searchQuery + '.*'}
        }
    ]
    }
    if(categoryId){
        queryFilter.categoryId = categoryId
    }
    if(brandId){
        queryFilter.brandId = brandId
    }
    console.log("queryFilter",queryFilter)
    const products = await Product.find(queryFilter).sort({
        [sortBy]: +sortOrder
    }).skip((page-1)*pageSize).limit(pageSize);
    return products.map(x => x.toObject())
}

 

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing
}