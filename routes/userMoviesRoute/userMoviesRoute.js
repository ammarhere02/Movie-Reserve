const {userGetMovies, userGetMovieById} = require('../../controllers/userAccessMovies/userAccessMovies')
const express = require("express");
const userMoviesRouter = express.Router();

const {authorization} = require('../../middlewares/authorization')
const {restrictionForUser} = require('../../middlewares/restrictedRoles')



userMoviesRouter.use(authorization , restrictionForUser)


/**
 * @swagger
 * /user/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [user retrieving Movies]
 *     responses:
 *       200:
 *         description: List of all movies retrieved successfully
 */

userMoviesRouter.get('/user/movies' , userGetMovies , (req, res) => {
    res.status(200)
    console.log("Routing of user movies successful ")
})
/**
* @swagger
* /user/movies/:id:
    *   get:
    *     summary: get a movie by ID
*     tags: [user retrieving Movies ]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The ID of the movie to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
    *             type: object
*             properties:
*               name:
    *                 type: string
*                 description: The name of the movie
*                 example: "Inception"
*               genre:
*                 type: string
*                 description: The genre of the movie
*                 example: "Sci-Fi"
*               user_id:
*                 type: integer
*                 description: The ID of the user (creator of the movie)
*                 example: 1
*     responses:
*       200:
*         description: Movie updated successfully
*       400:
*         description: Bad request, invalid input
*       404:
*         description: Movie not found
*       500:
*         description: Internal server error
*/

userMoviesRouter.get('/user/movies/:id' ,userGetMovieById, (req, res) => {
    res.status(200)
    console.log("Routing of user by movies id successful ")
})

module.exports = userMoviesRouter;