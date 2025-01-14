const {adminGetUsers , adminGetUsersById , adminUpdateUsers , adminDeleteUser} = require('../../controllers/adminAccessUsers/adminCrudUsers')
const express = require("express");
const adminRouteUsers = express.Router()
const {authorization} = require('../../middlewares/authorization')
const {restrictionForAdmin} = require('../../middlewares/restrictedRoles')

adminRouteUsers.use(authorization, restrictionForAdmin)

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin Manipulate Users]
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 */

adminRouteUsers.get('/admin/users' , adminGetUsers,( req, res) => {
    res.status(200)
    console.log("Routing of getting all users success")
})


/**
 * @swagger
 * /admin/user/:id:
 *   get:
 *     summary: get a user by ID
 *     tags: [Admin Manipulate Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the user
 *                 example: "vicky"
 *               email:
 *                 type: string
 *                 description: email of user
 *                 example: "vicky78@gmail.com"
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: got useer by id successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: user got found
 *       500:
 *         description: Internal server error
 */

adminRouteUsers.get('/admin/user/:id' , adminGetUsersById, ( req, res) => {

    res.status(200)
    console.log("Routing of getting user by id success")
})


/**
 * @swagger
 * /admin/user/:id:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Admin Manipulate Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the user
 *                 example: "vicky"
 *               email:
 *                 type: string
 *                 description: email of user
 *                 example: "vicky78@gmail.com"
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: user updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */


adminRouteUsers.patch('/admin/user/:id' , adminUpdateUsers,(req, res) => {
    res.status(200)
    console.log("Routing of update user by id success")
})


/**
 * @swagger
 * /admin/user/:id:
 *   delete:
 *     summary: delete a user by ID
 *     tags: [Admin Manipulate Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the user
 *                 example: "vicky"
 *               email:
 *                 type: string
 *                 description: email of user
 *                 example: "vicky78@gmail.com"
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: user deleted successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */


adminRouteUsers.delete('/admin/user/:id' , adminDeleteUser ,(req, res) => {
    res.status(200)
    console.log("Routing of deleted user by id success")
} )
module.exports = adminRouteUsers;