const {signUp , signIn} = require('../../controllers/authentication')
const express = require("express");

const authRoute = express.Router();

authRoute.post('/register', signUp)

authRoute.post('/login', signIn)

module.exports = authRoute
