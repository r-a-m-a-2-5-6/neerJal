const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
.then(()=>{console.log("database was connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NeerJal');
}

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    rollNumber:{
        type:Number,
        required:true
    }
})
const User=monogoose.model("User",userSchema)
module.expoerts=User;