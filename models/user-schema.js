const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    }
});

function validation(data){
    const checkUser = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })

    const {error} = checkUser.validate(data);

    return error;

}

const userModel = mongoose.model("user",userSchema);

module.exports = { userModel, validation};