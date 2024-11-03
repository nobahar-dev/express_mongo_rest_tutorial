const mongoose = require('mongoose')
const express = require('express')
const colors = require('colors')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/task')
    .then(() => console.log('Database is connected'))
    .catch(error => console.log(error))

const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

app.use(userRoutes)
app.use(taskRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is running at port ${port}`))