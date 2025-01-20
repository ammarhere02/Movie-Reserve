const {adminGetShowTime , adminGetShowTimeById , adminPostShowTime , adminUpdateShowTime , adminDeleteShowTime} = require('../../controllers/adminShowTime/adminCrudShowTime')

const {authorization} = require('../../middlewares/authorization')
const {restrictionForAdmin} = require('../../middlewares/restrictedRoles');
const express = require('express');
const showtimeRouter = express.Router();

showtimeRouter.use(authorization , restrictionForAdmin );



showtimeRouter.post('/movies/:id/showtime' , adminPostShowTime , (req, res) => {

    res.status(200).json({"success":true});
})

showtimeRouter.get('/movies/:movieId/showtime' , adminGetShowTime,(req, res) => {
    res.status(200).json({"success":true});
})

//specific movies , specific showtime(this router might cause error)
showtimeRouter.get('/movies/:movieId/showtime/:id' , adminGetShowTimeById , (req, res) => {
    res.status(200).json({"success":true});
})

showtimeRouter.patch('/movies/:movieId/showtime/:id' , adminUpdateShowTime,(req, res) => {
    res.status(200).json({"success":true});
})

showtimeRouter.delete('/movies/:movieId/showtime/:id' , adminDeleteShowTime , (req, res) => {
    res.status(200).json({"success":true});
})


module.exports = showtimeRouter

