const {ShowTime, movies} = require("../../models/seeders/seeders")

const adminPostShowTime = async(req, res) => {

    try {
        const {date, startTime, endTime, seats} = req.body;
        if (!date || !startTime || !endTime || !seats) {
            return res.status(400).json({message: "Please fill the body"});
        }
      await ShowTime.create({date : date, startTime : startTime, endTime : endTime, seats : seats})

        res.status(200).json({message: "show-time created successfully"})
    }
    catch (error) {
        console.error("Failed to create entries of showtime");
    }
}

const adminGetShowTime
 = async(req, res) => {

    try {
        const {params} = req.params;
        if(!params)
        {
            res.status(400).json({message: "Please fill the body"});
        }

        const getshowInfo = await ShowTime.findAll({
            where: {movieId : req.params.movieId},
            include : [{
                model : movies
            }]
        })
        return res.status(200).json(getshowInfo)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get show info"});
    }

}


const adminGetShowTimeById
    = async(req, res) => {

    try {
        const id = parseInt(req.params.id);
        if(!id)
        {
            res.status(400).json({message: "Please fill the body"});
        }

        const getshowInfo = await ShowTime.findOne(id,{
            where :{showTimeId : id , movieId : req.params.movieId},
            include : [{
                model : movies
            }]
        })
        return res.status(200).json(getshowInfo)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get show info by id"});
    }

}


const adminUpdateShowTime
    =
    async(req, res) =>
{

    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (!id) {
            res.status(400).json({message: "Please fill the body"});
        }
        const updateShowTime = await ShowTime.update(body, {

           where:{showTimeId : id , movieId: req.params.movieId}   //jahan hamari shotime id match karaygi parameter ki id se
        })
        console.log("Show-time updated successfully")
        res.status(200).json(updateShowTime)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to update show info"});
    }

}

const adminDeleteShowTime =
    async(req, res) => {

    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({message: "Please fill the body"});
        }
        const updateShowTime = await ShowTime.destroy({
            where: {showTimeId :id , movieId: req.params.movieId},
        })
        console.log("Show-time deleted successfully")
        res.status(200).json(updateShowTime)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to delete show info"});
    }
}

module.exports = {adminGetShowTime , adminGetShowTimeById , adminPostShowTime , adminUpdateShowTime , adminDeleteShowTime}