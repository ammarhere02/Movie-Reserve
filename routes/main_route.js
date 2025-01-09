const express = require('express');
const router = express.Router();
const authRoute = require('../routes/authroute/authroute')
const restrictRoute = require('../routes/restrict_route/restrict_route')
const adminManuRoute = require('../routes/admManiMovies/adminMani_route')
const adminManuUser = require('../routes/admManiUsers/adminManUsers')
const userMoviesRouter = require('../routes/userMoviesRoute/userMoviesRoute');
 router.use('/',authRoute)
 router.use('/' , restrictRoute)
 router.use('/', adminManuRoute)
router.use('/' , adminManuUser)
router.use('/' , userMoviesRouter)
module.exports = router;
