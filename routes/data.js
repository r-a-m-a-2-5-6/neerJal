const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const dataSchema= require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Data =require("../model/dataSchema.js");
const Joi = require('joi');
const { isLoggedIn } = require("../middlewares/middleware.js");

const date =new Date(Date.now()).toString() + 7 * 24 * 60 * 60 * 1000;
 

const validateData = (req,res,next) =>{
    let {err} = dataSchema.validate(req.body);
    if(err){
        let errMsg = err.map(el => el.message).join(",");
        throw new ExpressError(404,errMsg)
    }else{
        next();
    }
}

//main page
router.get("/main",isLoggedIn,(req,res)=> {
    res.render("main/index.ejs")
})
//profile route
router.get("/profile",isLoggedIn,(req,res) =>{
    const user= req.user;
    res.render("main/profile.ejs",{user})
});
//contributions route
router.get("/contributions",isLoggedIn, wrapAsync(async(req,res) =>{
    const user = req.user;
    const userContributions = await Data.find({student:user._id});
    res.render("main/contributions.ejs", {userContributions})
}))
//test vedios route
router.get("/testVedios",(req,res) =>{
    res.render("main/testVedios.ejs")
})
//data post route
router.post("/main",isLoggedIn,validateData,wrapAsync( async (req,res) =>{
    let data = req.body;
    let user = req.user;
    let insertData = new Data(req.body.data);
    insertData.createdAt=date.toString();
    insertData.student=user._id;
    await insertData.save();
    req.flash("siva","Data send sucessfully");
    res.redirect("/main")
}));

module.exports=router;