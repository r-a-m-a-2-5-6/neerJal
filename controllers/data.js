const Data =require("../model/dataSchema.js");
<<<<<<< HEAD
const cloudinary = require("../cloduinaryConfig.js")
const date =new Date(Date.now()) ;
=======

const date =new Date(Date.now());
>>>>>>> 5566ce8c1b6d26ea24da50eacb9f4d965dda85bc

module.exports.home=async (req,res) =>{
    res.render("main/home.ejs")
}

module.exports.dataPost = async (req,res) =>{
    let data = req.body;
    let user = req.user;
    console.log("main is working")
    let insertData = new Data(req.body.data);
<<<<<<< HEAD
    insertData.date=date;
    insertData.user=user._id;
    console.log(data.data,data,req.body);
=======
    insertData.createdAt=date;
    insertData.student=user._id;
>>>>>>> 5566ce8c1b6d26ea24da50eacb9f4d965dda85bc
    await insertData.save();
    req.flash("siva","Data send sucessfully");
    res.redirect("/home")
};

module.exports.testVedios=async(req,res) =>{
  
    res.render("main/testVedios.ejs")
};

module.exports.contributions =async(req,res) =>{
    const user = req.user;
    const userContributions = await Data.find({user:user._id});
    const contributions = userContributions.filter(el => el != "")
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
    console.log(updateData,data)
    if(updateData){
        req.flash("siva","Data Updated sucessfully");
    }
    res.redirect("/contributions")
}