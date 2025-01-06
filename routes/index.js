const express = require('express');
 const authRoute = require('../routes/authroute/authroute')
const router = express.Router();


 router.use('/',authRoute)


module.exports = router;
