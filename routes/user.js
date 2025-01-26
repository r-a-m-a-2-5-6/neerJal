const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedUrl } = require("../middlewares/middleware");



//creating account 
router.post("/signup", wrapAsync(async (req,res) =>{
    try{
    let {username,email,password,schoolname,city} = req.body;
    let newUser = User({username,email,schoolname,city});
    let registeredUser =await User.register(newUser,password);
    req.login(registeredUser, (err) =>{
        if(err){
            next(err);
        }
        req.flash("siva","Account Created Sucessfully")
    res.redirect("/main")
    })}catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
}))
//signup page
router.get("/signup",(req,res) =>{
    res.render("../users/signup.ejs")
})

//login page
router.get("/login",(req,res)=>{
    res.render("../users/login.ejs")
})

router.post('/login',savedUrl,passport.authenticate('local', ({
        failureRedirect:"/login",
        failureFlash:true
    })), 
    wrapAsync(async (req, res, next) => {
    req.flash("siva", "Logged in sucessfully. Welcome Back to NeerJal");
    res.redirect(res.locals.redirectUrl)
}))
//logout
router.get("/logout",(req,res,next)=>{
    req.logout( (err) =>{
        if(err){
            next(err);
        }
    })
    req.flash("siva","Log Out sucessfully");
    res.redirect("/testVedios")
})

module.exports=router;