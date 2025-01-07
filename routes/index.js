const express = require('express');
const router = express.Router();
const authRoute = require('../routes/authroute/authroute')
const restrictRoute = require('../routes/restrict_route/restrict_route')



 router.use('/',authRoute)
 router.use('/' , restrictRoute)

module.exports = router;
