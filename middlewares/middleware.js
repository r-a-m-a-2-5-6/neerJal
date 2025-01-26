
 const checkToken = (req,res,next)=>{
    let token = req.query.token;
    if(token === "givenacess"){
       return  next();
    }else{
        res.send("ACESS DENIED");
    }
    
}

module.exports={checkToken};

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","Login Required");
        return res.redirect("/login")
       }
    next();
}

module.exports.savedUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}