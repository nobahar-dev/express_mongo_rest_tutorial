const User = require('../model/User')

// create and store user into database
exports.storeUser = async (request, response) => {
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
}

// Show all users
exports.showAllUsers = async (request, response) => {
    const users = await User.find()
    return response.json({
        success: true,
        users
    })
}

// show user by id
exports.showUserById = async (request, response) => {
    const user = await User.findById(request.params['id'])
    return response.json({
        success: true,
        user
    })
}

// update a user by id
exports.updateUserById = async (request, response) => {
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
}

// Delete user from database
exports.deleteUser = async (request, response) => {
    const user = await User.findByIdAndDelete(request.params.id)

    if (!user) {
        return json.status(404).json({
            success: false,
            message: 'user not found'
        })
    }

    return response.json({
        success: true,
        message: 'user was deleted',
        user
    })
}