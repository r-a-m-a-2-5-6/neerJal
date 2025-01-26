const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {checkToken} = require("../middlewares/middleware.js");
const Data = require("../model/dataSchema");
const adminControllers = require("../controllers/admin.js");

//admin route
router.get("/admin", wrapAsync(adminControllers.admin));

module.exports=router;