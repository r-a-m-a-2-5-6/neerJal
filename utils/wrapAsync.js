function wrapAsync(fn){
    return function(req,res,err){
        fn(req,res,err).catch(err)
    }
}

module.exports=wrapAsync;