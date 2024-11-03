const Task = require('../model/Task')

// create and store task into database
exports.storeTask = async (request, response) => {
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
}

// Show all tasks
exports.showAllTask = async (request, response) => {
    const tasks = await Task.find()
    return response.json({
        success: true,
        tasks
    })
}

// show task by id
exports.showAllTaskById = async (request, response) => {
    const task = await Task.findById(request.params['id'])
    return response.json({
        success: true,
        task
    })
}

// update task by id
exports.updateTaskById = async (request, response) => {
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
}

// Delete task by id
exports.deleteTaskById = async (request, response) => {
    const task = await Task.findByIdAndDelete(request.params['id'])

    if (!task) {
        return response.status(404).json({
            success: false,
            message: 'task not found'
        })
    }

    return response.json({
        success: true,
        message: 'task was deleted',
        task
    })
}