const Data = require("../model/dataSchema");

module.exports.admin =async (req,res) =>{
    let data = await Data.find().populate("student");
    res.render("main/show.ejs",{data})
}