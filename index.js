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

const port = process.env.PORT || 4040
app.listen(port, () => console.log(`server is running at port ${port}`))