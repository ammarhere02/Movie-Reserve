const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;


const authorization = (req, res , next) => {

    req.user = null;
    const authHeader = req.headers.authorization;
    if(!authHeader){

        return res.status(401).json({message:"Failed to get headers"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }

    try
    {
        let verifyToken = jwt.verify(token , secretKey);
            req.user = verifyToken;
            console.log(req.user)
            console.log(verifyToken);
            next()
    }
    catch(err){
        return res.status(401).json({message:"Your credentials doesn't match"});
    }

}

module.exports = {authorization};