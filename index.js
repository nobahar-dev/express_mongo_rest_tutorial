const mongoose = require('mongoose')
const express = require('express')
const colors = require('colors')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/task')
    .then(() => console.log('Database is connected'))
    .catch(error => console.log(error))

const User = require('./model/User')
const Task = require('./model/Task')

// create and store task into database
app.post('/task', async (request, response) => {
    try {
        const task = new Task(request.body)
        await task.save()
        return response.status(201).json({
            success: true,
            task
        })
         
    } catch(error) {
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// create and store user into database
app.post('/user', async (request, response) => {
    try {
        const user = new User(request.body)
        await user.save()
        return response.status(201).json({
            success: true,
            user
        })

    } catch(error) {
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Show all tasks
app.get('/tasks', async (request, response) => {
    const tasks = await Task.find()
    return response.json({
        success: true,
        tasks
    })
})

// show task by id
app.get('/task/:id', async (request, response) => {
    const task = await Task.findById(request.params['id'])
    return response.json({
        success: true,
        task
    })
})

// update task by id
app.patch('/task/:id', async (request, response) => {
    try {
        const task = await Task.findByIdAndUpdate(request.params['id'], request.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return response.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return response.json({
            success: true,
            task
        })

    } catch(error) {
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Show all users
app.get('/users', async (request, response) => {
    const users = await User.find()
    return response.json({
        success: true,
        users
    })
})

// show user by id
app.get('/user/:id', async (request, response) => {
    const user = await User.findById(request.params['id'])
    return response.json({
        success: true,
        user
    })
})

// update a user by id
app.patch('/user/:id', async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(request.params['id'], request.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return response.json({
            success: true,
            user
        })

    } catch(error) {
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is running at port ${port}`))