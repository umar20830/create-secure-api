const jwt = require("jsonwebtoken");


const setToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SCERET);

        return token;
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}

const checkToken = (data) => {
    try {
        const token = jwt.verify(data, process.env.JWT_SCERET);
        return token;
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}

module.exports = { setToken, checkToken }