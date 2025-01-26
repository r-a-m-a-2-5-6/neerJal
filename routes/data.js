const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const dataSchema= require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Data =require("../model/dataSchema.js");
const Joi = require('joi');
const { isLoggedIn } = require("../middlewares/middleware.js");

const dataControllers = require("../controllers/data.js");

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
router.get("/main",isLoggedIn, wrapAsync(dataControllers.main))
//profile route
router.get("/profile",isLoggedIn, wrapAsync(dataControllers.profile));
//contributions route
router.get("/contributions",isLoggedIn, wrapAsync(dataControllers.contributions))
//test vedios route
router.get("/testVedios",wrapAsync(dataControllers.testVedios ))
//data post route
router.post("/main",isLoggedIn,validateData,wrapAsync( dataControllers.dataPost));

module.exports=router;