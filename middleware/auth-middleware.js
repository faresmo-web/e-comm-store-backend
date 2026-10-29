const jwt = require("jsonwebtoken");


function verifyToken(req, res, next){
    const authorization = req.headers["authorization"];
    console.log(req.headers);

    if(!authorization){
        return res.status(403).json({
            error:"No token provided"
        })
    }

    const token = authorization.startsWith("Bearer ")
        ? authorization.slice(7).trim()
        : authorization.trim();

    if(!token){
        return res.status(403).json({
            error:"No token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, "secret");
        console.log(decoded);
        req.user =  decoded;
        next();
    }catch(err){
        return res.status(401).json({
            error:"Invalid token"
        })
    }

}

function isAdmin(req,res,next){
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return res.status(403).send({
            error: "Forbidden"
        })
    }
}

module.exports = {verifyToken, isAdmin};