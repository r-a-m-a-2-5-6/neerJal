const User = require("../model/userSchema");

module.exports.postSignup=async (req,res) =>{
    try{
    let {username,email,password,schoolname,city} = req.body;
    let newUser = User({username,email,schoolname,city});
    let registeredUser =await User.register(newUser,password);
    req.login(registeredUser, (err) =>{
        if(err){
            next(err);
        }
        req.flash("siva","Account Created Sucessfully")
    res.redirect("/home")
    })}catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
};

module.exports.signup =(req,res) =>{
    res.render("../users/signup.ejs")
};

module.exports.login = (req,res)=>{
    res.render("../users/login.ejs")
};

module.exports.postLogin =async (req, res, next) => {
    req.flash("siva", "Logged in sucessfully. Welcome Back to NeerJal");
    res.redirect(res.locals.redirectUrl)
};

module.exports.logout =(req,res,next)=>{
    req.logout( (err) =>{
        if(err){
            next(err);
        }
    })
    req.flash("siva","Log Out sucessfully");
    res.redirect("/home")
}