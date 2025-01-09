const express = require('express');
const {authorization} = require("../../middlewares/authorization")
const {restrictionForUser ,restrictionForAdmin} = require("../../middlewares/restrictedRoles")

const userRouter = express.Router();

userRouter.get('/admin' , authorization , restrictionForAdmin,(req, res, next) => {

    res.status(200).json("Welcome Admin")
    next()
})

userRouter.get('/user', authorization , restrictionForUser,(req, res, next) => {

    res.status(200).json("Welcome User")
    next()
})

module.exports = userRouter