const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;


 function restrictedRole(role = []) {

    return (req, res , next) => {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({message:"Not authorized"});
        }
        const token = authHeader.split(" ")[1];
        let verifyToken;
        try
        {
            verifyToken = jwt.verify(token, secretKey);
            console.log("Got the headers ")
        }
        catch (err) {
            console.log("Error in verifying token: ", err);
        }

       if(role.includes(verifyToken.role))
       {
           console.log(`${verifyToken.role} is accessed to the page`);
           next()
       }
       else
       {
           return res.status(401).json({message:"Not authorized"});
       }

    }
}

const restrictionForUser = restrictedRole(["user"])
const restrictionForAdmin = restrictedRole(["admin" , "user"])

module.exports = {restrictionForUser, restrictionForAdmin};
