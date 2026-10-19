const Category = require("../db/category");

async function addCategory(model){
    let category = new Category({
        name: model.name,
    });
    await category.save();

    return category.toObject();
}

async function getCategory(){
    let categories = await Category.find();
    return categories.map((c) => c.toObject());
}

async function getCategoryById(id){
    let category = await Category.findById(id);
    return category ? category.toObject() : null;
}

async function updateCategory(id, model){
    console.log("here");
    await Category.findByIdAndUpdate({_id:id}, model);
    return;
}
async function deleteCategory(id){
    console.log("here");
    await Category.findByIdAndDelete(id);
    return;
}


module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryById
}