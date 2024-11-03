const express = require('express')
const router = express.Router()

const {
    storeTask,
    showAllTask,
    showAllTaskById,
    updateTaskById,
    deleteTaskById
} = require('../controller/task')

// create and store task into database
router.post('/task', storeTask)

// Show all tasks
router.get('/tasks', showAllTask)

// show task by id
router.get('/task/:id', showAllTaskById)

// update task by id
router.patch('/task/:id', updateTaskById)

// Delete task by id
router.delete('/task/:id', deleteTaskById)

module.exports = router