const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;


const authorization = async(req, res) => {

    req.user = null;
    const authHeader = req.headers.authorization;
    if(!authHeader){

        return res.status(401).json({message:"Failed to get headers"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    const verifyToken = jwt.verify(token , secretKey);
    if(!verifyToken){
        return res.status(401).json({message:"Your credentials does'ot match"});
    }
    console.log(verifyToken);
    return res.status(200).json({message:"Authorization completed successfully"});

}

module.exports = {authorization};