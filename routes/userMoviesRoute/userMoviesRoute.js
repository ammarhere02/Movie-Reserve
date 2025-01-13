const {userGetMovies, userGetMovieById} = require('../../controllers/userAccessMovies/userAccessMovies')
const express = require("express");
const userMoviesRouter = express.Router();

const {authorization} = require('../../middlewares/authorization')
const {restrictionForUser} = require('../../middlewares/restrictedRoles')

userMoviesRouter.use(authorization , restrictionForUser)

userMoviesRouter.get('/user/movies' , userGetMovies , (req, res) => {
    res.status(200)
    console.log("Routing of user movies successful ")
})

userMoviesRouter.get('/user/movies/:id' ,userGetMovieById, (req, res) => {
    res.status(200)
    console.log("Routing of user by movies id successful ")
})

module.exports = userMoviesRouter;