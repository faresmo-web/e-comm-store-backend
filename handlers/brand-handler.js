const Brand = require("../db/brand");

async function addBrands(model){
    let brand = new Brand({
        name: model.name,
    });
    await brand.save();

    return brand.toObject();
}

async function getBrands(){
    let brands = await Brand.find();
    return brands.map((b) => b.toObject());
}

async function getBrandById(id){
    let brand = await Brand.findById(id);
    return brand ? brand.toObject() : null;
}

async function updateBrand(id, model){
    console.log("here");
    await Brand.findByIdAndUpdate({_id:id}, model);
    return;
}


async function deleteBrand(id){
    console.log("here");
    await Brand.findByIdAndDelete(id);
    return;
}


module.exports = {
    addBrands,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}