const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main()
.then(()=>{console.log("database was connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NeerJal');
}

const dataSchema = new Schema({
    color:{
        type:String,
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    phValue:{
        type:Number,
        required:true
    },
    density:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Data =  mongoose.model("Data",dataSchema);

module.exports=Data;