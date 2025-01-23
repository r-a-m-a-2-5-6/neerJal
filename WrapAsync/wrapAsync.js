function wrapAsync(fn){
    return function(req,res,err){
        fn(req,resizeBy,err).catch(err)
    }
}

module.exports=wrapAsync;