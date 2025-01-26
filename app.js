require('dotenv').config();

const express = require("express");
const app= express();
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");
const path = require("path");
const data=require("./routes/data.js");
const user=require("./routes/user.js");
const admin = require("./routes/admin.js")
const User= require("./model/userSchema.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

const port = 8080;

const mongoUrl = process.env.ATLAS_DB;

const store = MongoStore.create({
    mongoUrl:mongoUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 60*60*24

})

store.on("error" , ()=>{
    console.log("Error is  mongoosesession ", err)
})
const sessionOptions={
    store,
    secret :process.env.SECRET,
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
app.use(express.json()); 




main()
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoUrl);
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
app.use("/",admin);


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
