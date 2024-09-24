const express = require('express');
const {
    sign,
    login,
    logout
} = require("../controllers/auth-controller")

const router = express.Router();

router.post("/sign", sign);

router.post("/login", login);

router.get("/logout", logout);




module.exports = router;