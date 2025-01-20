const {ShowTime , Booking} = require('../../models/seeders');
const postBook = async (req, res) => {
try {
    const {showTimeId ,seats, status } = req.body;

    if(!showTimeId)
    {
        res.status(400).send({message : "ID of showTIme for the movie not found"})
    }


    const st = parseInt(req.params.showTimeId);

 await ShowTime.findOne({
        where: {id : st}
    })

    const postBooking = await  Booking.create({showTimeId , seats , status})

    console.log("Booking created successfully");
    res.status(200).json(postBooking);
}

catch (error) {
    console.log(error);
}
}


const getBooking = async (req, res) => {
    try {
        const stId = parseInt(req.params.showTimeId);
        const checkShowId = await ShowTime.findOne({
            where: { id: stId },
        });

        if (!checkShowId) {
            return res.status(404).json({
                message: "The showtime doesn't exist in the database.",
            });
        }


        const getBooking = await Booking.findAll({
            where: { showTimeId: stId },
        });

        return res.status(200).json(getBooking);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the bookings.",
        });
    }
};

module.exports = {postBook , getBooking};