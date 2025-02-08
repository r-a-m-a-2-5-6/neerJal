const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');
const { type } = require("../schema");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    schoolname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
    ,
    city:{
        type:String,
        required:true
    },
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema)
module.exports=User;