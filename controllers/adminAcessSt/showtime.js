const { ShowTime, movies} = require("../../models/seeders")

const getShowTIme = async (req , res) => {
    const movieId = parseInt(req.params.movieId)
     await movies.findOne({
        where: {id : movieId}
    })

    const getshowTime = await ShowTime.findAll({

        where:{movieId : movieId}
    });
    if(!getshowTime)
    {
        res.status(400).json({message : "no movies found"});
    }
    else
    {
        res.status(400).json(getshowTime);
    }
}
const getShowTimeById = async (req, res) => {
    const id = parseInt(req.params.showTimeId);
    const movieId = parseInt(req.params.movieId);

    try {
        await movies.findByPk(movieId)
        const showtimeById = await ShowTime.findByPk(id);
        if (!showtimeById) {
            return res.status(404).json({ message: "Showtime not found" });
        }
        return res.status(200).json(showtimeById);
    } catch (error) {
        console.error("Error fetching showtime by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const postShowtime = async(req , res) => {

    try {

        const {date , startTime , endTime , seats , movieId} = req.body;
        // if(ShowTime.findOne({
        //     where: { startTime : startTime , endTime : endTime}
        //
        // }))
        // {
        //     return res.status(400).json("There's a clash in movies")
        // }

        await movies.findByPk(movieId)

        const postShowtime = await ShowTime.create({date , startTime , endTime , seats , movieId : movieId});
        console.log(postShowtime)
        res.status(200).json({message : "Post successfully created"});
    }
    catch (error) {
        console.log(error);
    }

}



const updateShowtime = async(req , res) => {
try {

    const id = parseInt(req.params.movieId);
    const showtimeId = parseInt(req.params.id);

    const body = req.body;

    await movies.findByPk(id)
    await ShowTime.update(body,{
        where: {id : showtimeId}
    })
    res.status(200).json({message : "Updated successfully"});
}
catch (error) {
    console.log(error);
}
}


const deleteShowtime = async(req , res) => {
    try {

        const id = parseInt(req.params.movieId);
        const showtimeId = parseInt(req.params.id);

        await movies.findByPk(id)
        const deletedData = await ShowTime.destroy({
            where :{id : showtimeId}
        })
        console.log(deletedData);


        if(deletedData !== 1)
        {
           console.log("Record is already deleted")
            return res.status(400);
        }
       else
        {
          return res.status(200).json({message : "Deleted successfully"});
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getShowTIme, getShowTimeById , postShowtime ,updateShowtime , deleteShowtime};