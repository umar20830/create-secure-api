module.exports = (req,res)=>{
        res.send(`${req.user.username}, you are on your profile`);
}