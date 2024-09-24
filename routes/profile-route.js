const express = require("express");
const profileController = require("../controllers/profile-controller");
const { protect } = require("../middlewares/protect");

const router = express.Router();


router.get("/", protect, profileController);



module.exports = router;