const jwt = require('jsonwebtoken')
const {user} = require("../models/seeders")
const bcrypt = require("bcrypt")
const dotenv= require("dotenv")
dotenv.config()
const secretKey = process.env.SECRETKEY

const register = async(req, res) => {

const {username , email , password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({error: "Username or email or password not found"})
    }

    const existingUser = await user.findOne({
        where: {
            email: email,
            username: username
        }
    })
    if(existingUser){
        return res.status(400).json({error: "Your credentials already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await user.create({username: username,email:email, password : hashPassword})

    return res.status(200).json({message:"User created successfully"})
}

const login = async(req, res) => {

    const {email, password} = req.body

    const checkUser = await user.findOne({
       where: {email: email}
    })
    if(!email || !password) {
        return res.status(400).json({error: "Email or password not found"})
    }

   const validPass = await bcrypt.compare(password, checkUser.password)
    if(!validPass)
    {
        return res.status(400).json({error: "Invalid password"})
    }
    const token = jwt.sign({email: email , role : checkUser.role }, secretKey, {expiresIn: '1h'})

    const verifyToken = await jwt.verify(token, secretKey)
    if(!verifyToken)
    {
        return res.status(400).json({error: "Invalid token"})
    }
    console.log("User logged in and token generated successfully")
    return res.status(200).json({token: token})
}
module.exports =  {register, login}