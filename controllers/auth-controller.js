const { userModel, validation } = require("../models/user-schema");
const { passwordEncryption, passwordChecker } = require("../utils/secure-password")
const { setToken } = require("../utils/set-token")


module.exports.sign = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).send("Apko login krna chahiya");
        }

        let error = validation({ username, email, password });

        if (error) {
            return res.status(400).send(error.message);
        }
        else {
            const hash = await passwordEncryption(password);

            user = await userModel.create({
                username,
                email,
                password: hash,
            })

            let token = setToken(email);

            res.cookie("token", token, {
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.status(200).send("Signup successful");

        }
    } catch (err) {
        return res.status(400).send(err.message);
    }

}


module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            const result = await passwordChecker(password, user.password);
            if (result) {
                let token = setToken(email);

                res.cookie("token", token, {
                    secure: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });

                return res.status(200).send("Login successful");
            }
            else {
                return res.status(500).send("email or password is incorrect");
            }
        }else{
            res.status(500).send("First create your account.");
        }

    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}


module.exports.logout = (req, res) => {
    res.cookie("token", "", {
        secure: true,
        httpOnly: true
    });
    res.status(200).send("Logged out successfully");
}
