const Data =require("../model/dataSchema.js");

const date =new Date(Date.now()).toString() + 7 * 24 * 60 * 60 * 1000;

module.exports.dataPost = async (req,res) =>{
    let data = req.body;
    let user = req.user;
    let insertData = new Data(req.body.data);
    insertData.createdAt=date.toString();
    insertData.student=user._id;
    await insertData.save();
    req.flash("siva","Data send sucessfully");
    res.redirect("/main")
};

module.exports.testVedios=async(req,res) =>{
    res.render("main/testVedios.ejs")
};

module.exports.contributions =async(req,res) =>{
    const user = req.user;
    const userContributions = await Data.find({student:user._id});
    res.render("main/contributions.ejs", {userContributions})
};

module.exports.profile = async (req,res) =>{
    const user= req.user;
    res.render("main/profile.ejs",{user})
};
module.exports.main= async (req,res)=> {
    res.render("main/index.ejs")
};