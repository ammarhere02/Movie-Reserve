const {getShowTIme , getShowTimeById} = require('../../controllers/adminAcessSt/showtime')
const express = require("express");
const {authorization} = require('../../middlewares/authorization');
const {restrictionForUser} = require('../../middlewares/restrictedRoles')
const userRouter = express.Router()
userRouter.use(authorization , restrictionForUser)


userRouter.get('/:movieId/showtime' , getShowTIme)
userRouter.get('/:movieId/showtime/id' , getShowTimeById)

module.exports = userRouter

