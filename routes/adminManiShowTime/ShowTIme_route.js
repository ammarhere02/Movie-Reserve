const {adminGetShowTime , adminGetShowTimeById , adminPostShowTime , adminUpdateShowTime , adminDeleteShowTime} = require('../../controllers/adminShowTime/adminCrudShowTime')

const {authorization} = require('../../middlewares/authorization')
const {restrictionForAdmin} = require('../../middlewares/restrictedRoles');
const express = require('express');
const showtimeRouter = express.Router();

showtimeRouter.use(authorization , restrictionForAdmin );



showtimeRouter.post('/admin/movies/:movieId/showtime' , adminPostShowTime , (req, res) => {

    res.status(200).json({"success":true});
})

showtimeRouter.get('/admin/movies/:movieId/showtime' , adminGetShowTime,(req, res) => {
    res.status(200).json({"success":true});
})

//specific movies , specific showtime(this router might cause error)
showtimeRouter.get('/:movieId/showtime/:id' , adminGetShowTimeById , (req, res) => {
    res.status(200).json({"success":true});
})

showtimeRouter.patch('/admin/movies/:movieId/showtime/:id' , adminUpdateShowTime,(req, res) => {
    res.status(200).json({"success":true});
})

showtimeRouter.delete('/admin/movies/:movieId/showtime/:id' , adminDeleteShowTime , (req, res) => {
    res.status(200).json({"success":true});
})


module.exports = showtimeRouter

