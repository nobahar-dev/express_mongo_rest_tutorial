const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 18) throw new Error("age can't be less than 18")
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('email is not valid')
        }
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User