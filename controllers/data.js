const Data =require("../model/dataSchema.js");
const cloudinary = require("../cloduinaryConfig.js")
const date =new Date(Date.now()) ;

module.exports.home=async (req,res) =>{
    res.render("main/home.ejs")
}

module.exports.dataPost = async (req,res) =>{
    let data = req.body;
    let user = req.user;
    let insertData = new Data(req.body.data);
    insertData.date=date;
    let url = req.file.path;
    insertData.photographsRemarks=url;
    insertData.user=user._id;
    await insertData.save();
    req.flash("siva","Data send sucessfully. Thanks for your contribution");
    res.redirect("/home")
};

module.exports.testVedios=async(req,res) =>{
  
    res.render("main/testVedios.ejs")
};

module.exports.contributions =async(req,res) =>{
    const user = req.user;
    const userContributions = await Data.find({user:user._id});
    res.render("main/contributions.ejs", {userContributions})
};

module.exports.profile = async (req,res) =>{
    const user= req.user;
    res.render("main/profile.ejs",{user})
};
module.exports.main= async (req,res)=> {
    let user = req.user;
    res.render("main/index.ejs", {user})
};

module.exports.editData= async (req,res) =>{
    let {id} =req.params;
    let data = await Data.find({});
    let editData = data.filter(el => el._id ==id)
    res.render("main/edit.ejs", {editData})
};

module.exports.putData= async (req,res) =>{
    let data =req.body;
    let {id} = req.params;
    let updateData = await Data.findByIdAndUpdate(id,data);
    if(updateData){
        req.flash("siva","Data Updated sucessfully");
    }
    res.redirect("/contributions")
}