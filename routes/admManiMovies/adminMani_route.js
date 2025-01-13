const {adminPostMovies , adminGetMovies , adminGetMoviesByID , adminPatchMovies , adminDeleteMovies} = require("../../controllers/adminMovies/admCrudMovies");
const {authorization} = require("../../middlewares/authorization")
const {restrictionForAdmin} = require("../../middlewares/restrictedRoles")
const express = require("express");

const adminMoviesRouter = express.Router();

adminMoviesRouter.use(authorization, restrictionForAdmin)

adminMoviesRouter.post('/admin/movies' , adminPostMovies,(req, res) => {

    res.status(200)
    console.log("Routing of posting movies successful ")
});

adminMoviesRouter.get('/admin/movies' , adminGetMovies ,(req, res) => {
    res.status(200)
    console.log("Routing of getting movies successful")

} )

adminMoviesRouter.get('/admin/movies/:id' , adminGetMoviesByID , (req, res ) => {
    res.status(200)
    console.log("Routing of getting movies by id successful ")
})

adminMoviesRouter.patch('/admin/movies/:id' , adminPatchMovies,(req, res) => {
    res.status(200).json({message : "Movie updated successfully"})

})

adminMoviesRouter.delete('/admin/movies/:id' , adminDeleteMovies,(req, res ) => {
    res.status(200).json({message : "Movie deleted successfully"})

} )



module.exports = adminMoviesRouter;


