
const { movies} = require('../../models/seeders/seeders')

const adminPostMovies = async(req, res) => {

    const {name , genre } = req.body

    if(!name || !genre){

        return res.status(400).json({error: "Please enter the fields of movie"})
    }

    const postMovie = await movies.create({name , genre})

    if(!postMovie)
    {
        return res.status(400).json({error: "Admin failed to post the movies"})
    }

    return res.status(200).json({message : "Movies info created successfully"})

}

const adminGetMovies = async(req, res) => {

    const data = req.params;

    if(!data){

        return res.status(400).json({error: "required params for getting the movie is missing"})
    }
    else
    {
        const getMovie = await movies.findAll()
        return res.status(200).json(getMovie)
    }
}

const adminGetMoviesByID = async(req, res) =>
{
    const id = parseInt(req.params.id)

    if(!id){

        return res.status(400).json({error: "Required parameter for id"})
    }
    else
    {
        const getID =  await movies.findByPk(id)
        console.log("Found the id with the specific movie")
        return res.status(200).json(getID)
    }
}

const adminPatchMovies = async (req, res) =>
{
    const id= parseInt(req.params.id)
    const body = req.body
    if(!id){
        return res.status(400).json({error: "Required parameter for id"})
    }

    else
    {
        await movies.update(body,{

            where:{id : id},
        })

        return res.status(200).json({message : "Movie updated"})
    }
}

const adminDeleteMovies = async(req, res) =>
{
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).json({error: "Required parameter for id"})
    }
    else
    {
        await movies.destroy({
            where:{id}
        })
        return res.status(200).json({message : "Movie deleted"})
    }
}
module.exports = {adminPostMovies , adminGetMovies , adminGetMoviesByID , adminPatchMovies , adminDeleteMovies}
