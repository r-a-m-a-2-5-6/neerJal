const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const dataSchema= require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Data =require("../model/dataSchema.js");
const Joi = require('joi');

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
router.get("/main",(req,res)=> {
    res.render("main/index.ejs")
})
//profile route
router.get("/profile",(req,res) =>{
    res.render("main/profile.ejs")
});
//contributions route
router.get("/contributions",(req,res) =>{
    res.render("main/contributions.ejs")
})
//test vedios route
router.get("/testVedios",(req,res) =>{
    res.render("main/testVedios.ejs")
})
//data post route
router.post("/main",validateData,wrapAsync( async (req,res) =>{
    let data = req.body;
    console.log(data);
    let insertData = new Data(req.body.data);
    insertData.createdAt=date.toString();
   await insertData.save()
    .catch(err =>{
        console.log(err)
    })
    res.redirect("/main")
}));

module.exports=router;