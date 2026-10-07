import mongoose , {Schema} from "mongoose";

const postSchemca = new Schema ({ name:{
    type:String,
    required:true,
    trim:true
},
age :{
    type:Number,
    required:true,
    min:14, // gotta be at least 14yrs old
    max:100
},
description:{
    type:String,
    required:true,
    trim:true
},
createdBy: {
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},

},
{timestamps:true}
);

export const post = mongoose.model("post",postSchemca);