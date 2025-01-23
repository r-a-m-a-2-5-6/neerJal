
module.exports.checkToken = (req,res,next)=>{
    let token = req.query.token;
    if(token === "givenacess"){
       return next();
    }
    res.send("ACESS DENIED")
}

