const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const dataSchema= require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Joi = require('joi');
const { isLoggedIn } = require("../middlewares/middleware.js");
const methodOverride = require("method-override");
const dataControllers = require("../controllers/data.js");

const validateData = (req,res,next) =>{
    let {err} = dataSchema.validate(req.body);
    if(err){
        let errMsg = err.map(el => el.message).join(",");
        throw new ExpressError(404,errMsg)
    }else{
        next();
    }
}
//home page
router.get("/home", wrapAsync(dataControllers.home))
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
//data edit route
router.get("/edit/:id",isLoggedIn,wrapAsync(dataControllers.editData))
//put edit data
router.put("/edit/:id",isLoggedIn,validateData, wrapAsync(dataControllers.putData));

module.exports=router;