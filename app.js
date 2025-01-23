const express = require("express");
const app= express();
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");
const path = require("path");
const port = 8080;
const Data = require("../TaskCivil/model/dataSchema");
const ExpressError = require("../TaskCivil/Error/ExpressError.js");
const wrapAsync = require("../TaskCivil/WrapAsync/wrapAsync.js");
const {checkToken} = require("../TaskCivil/middlewares/middleware.js");
app.engine("ejs",ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
main()
.then(()=>console.log("database is connected"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NeerJal');
    
}

const date =new Date(Date.now()).toString() + 7 * 24 * 60 * 60 * 1000;

//main page
app.get("/main",(req,res)=> {
    res.render("main/index.ejs")
})
//profile route
app.get("/profile",(req,res) =>{
    res.render("main/profile.ejs")
});
//contributions route
app.get("/contributions",(req,res) =>{
    res.render("main/contributions.ejs")
})
//test vedios route
app.get("/testVedios",(req,res) =>{
    res.render("main/testVedios.ejs")
})
//data post route
app.post("/data",wrapAsync( async (req,res) =>{
    console.log("post data is working");
    let data = req.body;
    let insertData = new Data(req.body.data);
    insertData.createdAt=date.toString();
   await insertData.save()
    .catch(err =>{
        console.log(err)
    })
    res.redirect("/main")
}));
//admin route
app.get("/admin",checkToken, wrapAsync(async (req,res) =>{
    let data = await Data.find();
    res.render("main/show.ejs",{data})
}));
//login page
app.get("/login",(req,res)=>{
    res.render("../users/login.ejs")
})
//signup page
app.get("/signup",(req,res) =>{
    res.render("../users/signup.ejs")
})
app.get("/",(req,res)=>{
    res.send("root is working")
})
//error handling
app.use((err,req,res,next) =>{
    let{status ="500", message ="some message"}=err;
    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log("port is listening sucessfully");
})