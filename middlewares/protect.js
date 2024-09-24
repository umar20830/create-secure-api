const { checkToken } = require("../utils/set-token");
const {userModel} = require("../models/user-schema");
const jwt = require("jsonwebtoken")

module.exports.protect = async (req, res, next) => {

    if (req.cookies.token) {
        try {
            const data = checkToken(req.cookies.token);
            req.user = await userModel.findOne({ email: data }).select("-password");
            next();
        }
        catch (err) {
            console.error(err.message);
            res.status(401).send("You are not authorized!")
        }
    }
    if (!req.cookies.token) {
        res.status(401).send("You are not authorized!");
    }
}