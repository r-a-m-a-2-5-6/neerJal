require('dotenv').config();

const express = require("express");
const app= express();
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");
const path = require("path");
const data=require("./routes/data.js");
const user=require("./routes/user.js");
const User= require("./model/userSchema.js");
const session = require('express-session');
const Data = require("./model/dataSchema");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const {checkToken} = require("./middlewares/middleware.js");
const {dataSchema} = require("./schema.js");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStratergy = require("passport-local");
const bodyParser = require('body-parser');

const port = 8080;
const sessionOptions={
    secret :"NeerJal",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 1000*60*60*24*3,
        maxAge: 1000*60*60*24*3,
        httpOnly:true
    }
}

app.engine("ejs",ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

main()
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NeerJal');
}

app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next) =>{
    res.locals.siva=req.flash("siva");
    res.locals.error=req.flash("error");
    res.locals.curUser = req.user;
    next();
})

app.use("/",data);
app.use("/",user);



//admin route
app.get("/admin",checkToken, wrapAsync(async (req,res) =>{
    let data = await Data.find().populate("student");
    res.render("main/show.ejs",{data})
}));

app.get("/",(req,res)=>{
    res.send("root is working")
})
app.get("*",(req,res) =>{
    throw new ExpressError(400,"Bad Request");
})
//error handling
app.use((err,req,res,next) =>{
    let{status ="500", message ="some message"}=err;
    res.render("Error.ejs",{err})
})

app.listen(port,()=>{
    console.log("port is listening sucessfully");
})