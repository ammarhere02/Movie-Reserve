const express = require('express');
const router = express.Router();
const authRoute = require('../routes/authroute/authroute')
const restrictRoute = require('../routes/restrict_route/restrict_route')
const adminManuRoute = require('../routes/admManiMovies/adminMani_route')

 router.use('/',authRoute)
 router.use('/' , restrictRoute)
 router.use('/', adminManuRoute)


module.exports = router;
