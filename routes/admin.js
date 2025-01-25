const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {checkToken} = require("./middlewares/middleware.js");
const Data = require("./model/dataSchema");

//admin route
router.get("/admin",checkToken, wrapAsync(async (req,res) =>{
    let data = await Data.find();
    res.render("main/show.ejs",{data})
}));