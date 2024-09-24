require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnection = require("./config/mongoose-connection");
const authRouter = require('./routes/auth-route');
const profileRouter = require("./routes/profile-route");



const app = express();

dbConnection(); // connecting to mongoDB.

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRouter);
app.use("/profile", profileRouter);


app.listen(process.env.PORT || 3000);