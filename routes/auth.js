const express = require("express");
const router = express.Router();

const {registerUser, loginUser} = require("../handlers/auth-handlers");


router.post("/register", async (req, res) => { 
    let model = req.body;
    if(model.name && model.email && model.password){
        // todo register user
        await registerUser(model);
        res.status(200).json({
            message:"User registered successfully"
        });
    }else{
        res.status(400).json({
            error:"Please provide name, email and password"
    });
    }
 });

 router.post("/login", async (req, res) => { 
    let model = req.body;
    if (model.email && model.password){
        // todo login user
        const result = await loginUser(model);
        if(result){
           res.send(result);
        }else{
            res.status(400).json({
                error:"Invalid email or password"
            })
        }
        
    }else{
        res.status(400).json({
            error:"Please provide  email and password"
    });
    }
 });

module.exports = router;