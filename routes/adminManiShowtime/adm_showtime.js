const {getShowTIme, getShowTimeById , postShowtime , updateShowtime , deleteShowtime} = require('../../controllers/adminAcessSt/showtime')
const {authorization} = require('../../middlewares/authorization');
const {restrictionForAdmin} = require('../../middlewares/restrictedRoles')
const express = require("express");

const showtimeRouter = express.Router()

showtimeRouter.use(authorization , restrictionForAdmin)

showtimeRouter.get('/:movieId/showtime', getShowTIme)
showtimeRouter.get('/:movieId/showtime/:showTimeId' ,getShowTimeById)
showtimeRouter.post('/showtime',postShowtime )
showtimeRouter.patch('/:movieId/showtime/:id' , updateShowtime)
showtimeRouter.delete('/:movieId/showtime/:id', deleteShowtime)

module.exports = showtimeRouter