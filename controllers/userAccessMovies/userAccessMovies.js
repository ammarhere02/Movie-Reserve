const {movies} = require('../../models/seeders')


const userGetMovies = async (req, res) => {

    try
    {
        const getALLMovies = await movies.findAll()
        return res.status(200).json(getALLMovies)
    }
    catch(err){
        res.status(400).json({error:"Failed to get all movies"})
    }

}

const userGetMovieById = async (req, res) => {

    try
    {
        const id = req.params.id
        const getMoviesById = await movies.findByPk(id)
        return res.status(200).json(getMoviesById)
    }
    catch(err){
        res.status(400).json({error:"Failed to get movie by id"})
    }
}
module.exports = {userGetMovies, userGetMovieById}