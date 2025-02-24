const Data = require("../model/dataSchema");

module.exports.admin =async (req,res) =>{
    let data = await Data.find().populate("user");
    console.log(data)
    res.render("main/show.ejs",{data})
}