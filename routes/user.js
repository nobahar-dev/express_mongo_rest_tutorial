const express = require('express')
const router = express.Router()

const {
    storeUser,
    showAllUsers,
    showUserById,
    updateUserById,
    deleteUser
} = require('../controller/user')

// create and store user into database
router.post('/user', storeUser)

// Show all users
router.get('/users', showAllUsers)

// show user by id
router.get('/user/:id', showUserById)

// update a user by id
router.patch('/user/:id', updateUserById)

// Delete user from database
router.delete('/user/:id', deleteUser)

module.exports = router