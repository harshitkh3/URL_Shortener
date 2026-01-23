import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    shortID:{
type:String,
required:true,
unique:true,
    },
redirectedURL:{
    type:String,
    required:true,
},
visitHistory:[
    {
        timestamp:{type:Number}
    }
],
},{timestamps:true})
export default mongoose.model('URL',URLSchema)