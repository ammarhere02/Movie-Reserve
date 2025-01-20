const {adminPostMovies , adminGetMovies , adminGetMoviesByID , adminPatchMovies , adminDeleteMovies} = require("../../controllers/adminMovies/admCrudMovies");
const {authorization} = require("../../middlewares/authorization")
const {restrictionForAdmin} = require("../../middlewares/restrictedRoles")
const express = require("express");

const adminMoviesRouter = express.Router();

adminMoviesRouter.use(authorization, restrictionForAdmin)

/**
 * @swagger
 * /admin/movies:
 *   post:
 *     summary: Post a new movie
 *     tags: [Admin Manipulate Movies]
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
 *     responses:
 *       200:
 *         description: Movie successfully created
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */



adminMoviesRouter.post('/admin/movies' , adminPostMovies,(req, res) => {

    res.status(200)
    console.log("Routing of posting movies successful ")
});


/**
 * @swagger
 * /admin/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Admin Manipulate Movies]
 *     responses:
 *       200:
 *         description: List of all movies retrieved successfully
 */

adminMoviesRouter.get('/admin/movies' , adminGetMovies ,(req, res) => {
    res.status(200)
    console.log("Routing of getting movies successful")

} )

/**
 * @swagger
 * /admin/movies/:id:
 *   get:
 *     summary: Update a movie by ID
 *     tags: [Admin Manipulate Movies]
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

adminMoviesRouter.get('/admin/movies/:id' , adminGetMoviesByID , (req, res ) => {
    res.status(200)
    console.log("Routing of getting movies by id successful ")
})

/**
 * @swagger
 * /admin/movies/:id:
 *   patch:
 *     summary: Update a movie by ID
 *     tags: [Admin Manipulate Movies]
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

adminMoviesRouter.patch('/admin/movies/:id' , adminPatchMovies,(req, res) => {
    res.status(200).json({message : "Movie updated successfully"})

})

/**
 * @swagger
 * /admin/movies/:id:
 *   delete:
 *     summary: Update a movie by ID
 *     tags: [Admin Manipulate Movies]
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

adminMoviesRouter.delete('/admin/movies/:id' , adminDeleteMovies,(req, res ) => {
    res.status(200).json({message : "Movie deleted successfully"})

} )



module.exports = adminMoviesRouter;


