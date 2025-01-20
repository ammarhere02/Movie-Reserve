const {postBook , getBooking} = require('../../controllers/userAccessBooking/booking')
const {authorization} = require('../../middlewares/authorization');
const {restrictionForUser} = require('../../middlewares/restrictedRoles')
const express = require("express");
const bookingRouter = express.Router()


bookingRouter.use(authorization , restrictionForUser)


bookingRouter.post('/booking' , postBook)

bookingRouter.get('/:showTimeId/booking' , getBooking)

module.exports = bookingRouter