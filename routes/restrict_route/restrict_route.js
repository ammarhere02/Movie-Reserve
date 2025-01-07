const express = require('express');
const {authorization} = require("../../middlewares/authorization")
const {restrictionForUser ,restrictionForAdmin} = require("../../middlewares/restrictedRoles")

const userRouter = express.Router();

userRouter.get('/admin' , authorization , restrictionForAdmin,(req, res) => {

    res.status(200).json("Welcome Admin")

})

userRouter.get('/user', authorization , restrictionForUser,(req, res) => {

    res.status(200).json("Welcome User")
})

module.exports = userRouter