const Cart = require("../db/cart");


async function addToCart(userId,productsId,quantity) {
    let product = await Cart.findOne({
        userId:userId,
        productsId:productsId
    });
    if(product){
        await Cart.findByIdAndUpdate(product._id,{
            quantity: product.quantity + quantity,
        })
    }else{
        product = new Cart({
            userId:userId,
            productsId:productsId,
            quantity:quantity
        })
        await product.save()
    }
}


async function removefromCart(userId,productsId) {
    await Cart.findOneAndDelete({
        userId:userId,
        productsId:productsId
    });
}

async function getCart(userId) {
    const products = await Cart.find({userId:userId}).populate("productsId")
    return products.map((x) => {
        return {
        quantity:x.quantity,
        product:x.productsId
    }
    })
}

module.exports = {
    addToCart,
    removefromCart,
    getCart
}