const express = require("express");
const router = express.Router();


//login page
router.get("/login",(req,res)=>{
    res.render("../users/login.ejs")
})
//signup page
router.get("/signup",(req,res) =>{
    res.render("../users/signup.ejs")
})

module.exports=router;