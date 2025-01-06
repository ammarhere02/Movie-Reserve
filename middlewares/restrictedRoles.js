const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;


 function restrictedRole(role = []) {

    return (req, res , next) => {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({message:"Not authorized"});
        }
        console.log("Got the headers ")
        const token = authHeader.split(" ")[1];
        const verifyToken = jwt.verify(token, secretKey);
        if(!verifyToken){
             res.status(401).json({message:"Credentials doesnot match"});
        }

        if(!role.includes(verifyToken.role))
        {
             res.status(401).json({message:"Your role is restricted to access the page"});
        }
        console.log(verifyToken.role);

        res.status(200).json({message:`Successfully logged in as ${role}`});
        next()
    }


}

const restrictionForUser = restrictedRole(["user" , "admin"])
const restrictionForAdmin = restrictedRole(["admin"])

module.exports = {restrictionForUser, restrictionForAdmin};
