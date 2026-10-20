const express = require("express");
const router = express.Router();

const { addBrands, updateBrand, deleteBrand, getBrandById, getBrands} = require("../handlers/brand-handler");

router.post("", async (req, res) => {
    let model = req.body;
    let result = await addBrands(model);
    res.send(result);
})

router.put("/:id", async (req, res) => {
    console.log("here");
    let model = req.body;
    let id = req.params['id'];
    await updateBrand(id, model);
    res.send({message:"Brand updated successfully"});
});


router.delete("/:id", async (req, res) => {
    console.log("here");
    let id = req.params['id'];
    await deleteBrand(id);
    res.send({message:"Brand deleted successfully"});
});


router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let brand = await getBrandById(id);
    res.send(brand);
});

router.get("/", async (req, res) => {
    let brands = await getBrands();
    res.send(brands);
});

module.exports = router; 
