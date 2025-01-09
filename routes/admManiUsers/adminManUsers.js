const {adminGetUsers , adminGetUsersById , adminUpdateUsers , adminDeleteUser} = require('../../controllers/adminAccessUsers/adminCrudUsers')
const express = require("express");
const adminRouteUsers = express.Router()
const {authorization} = require('../../middlewares/authorization')
const {restrictionForAdmin} = require('../../middlewares/restrictedRoles')

adminRouteUsers.use(authorization, restrictionForAdmin)

adminRouteUsers.get('/admin/users' , adminGetUsers,( req, res) => {
    res.status(200)
    console.log("Routing of getting all users success")
})

adminRouteUsers.get('/admin/user/:id' , adminGetUsersById, ( req, res) => {
    res.status(200)
    console.log("Routing of getting user by id success")
})

adminRouteUsers.patch('/admin/user/:id' , adminUpdateUsers,(req, res) => {
    res.status(200)
    console.log("Routing of update user by id success")
})
adminRouteUsers.delete('/admin/user/:id' , adminDeleteUser ,(req, res) => {
    res.status(200)
    console.log("Routing of deleted user by id success")
} )
module.exports = adminRouteUsers;