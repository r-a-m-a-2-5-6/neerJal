const User = require("../model/userSchema");

module.exports.postSignup=async (req,res) =>{
    try{
    let {username,email,password,schoolname,city,role} = req.body;
    let newUser = User({username,email,schoolname,city,role});
    let registeredUser =await User.register(newUser,password);
    req.login(registeredUser, (err) =>{
        if(err){
            next(err);
        }
        req.flash("siva","Account Created Sucessfully. Welcome to cMahanadi")
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
    
   if(res.locals.redirectUrl){
    req.flash("siva", "Logged in sucessfully. Welcome Back to cMahanadi!");
    res.redirect(res.locals.redirectUrl)
    }
    else{
        req.flash("siva", "Logged in sucessfully. Welcome Back to cMahanadi!");
        res.redirect("/home")
    }
    
};

module.exports.logout =(req,res,next)=>{
    req.logout( (err) =>{
        if(err){
            next(err);
        }
    })
    req.flash("siva","Log Out sucessfully. Visit cMahanadi again!");
    res.redirect("/home")
}