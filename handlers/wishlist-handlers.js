const Wishlist = require("../db/wishlist");

async function addToWishlist(userId, productsId) {
    const wishList = new Wishlist({
        userId: userId,
        productsId: productsId
    });
    await wishList.save();
    return wishList.toObject();
}

async function removeFromWishlist(userId, productsId) {
    await Wishlist.deleteMany({
        userId: userId,
        productsId: productsId
    });
}

async function getWishlist(userId) {
    let wishlists = await Wishlist.find({ userId: userId }).populate('productsId');
    return wishlists
        .map(x => x.toObject().productsId)
        .flat()
        .filter(x => !!x);
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
