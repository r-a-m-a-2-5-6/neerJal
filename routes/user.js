const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedUrl } = require("../middlewares/middleware");
const userContollers = require("../controllers/user");


//creating account 
router.post("/signup", wrapAsync(userContollers.postSignup));
//signup page
router.get("/signup", userContollers.signup );

//login page
router.get("/login",userContollers.login);

router.post('/login',savedUrl,passport.authenticate('local', ({
        failureRedirect:"/login",
        failureFlash:true
    })), 
    wrapAsync(userContollers.postLogin));
//logout
router.get("/logout", userContollers.logout)

module.exports=router;