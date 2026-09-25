import mongoose, {Schema} from "mongoose"; // schema means structure
import validator from "validator"; // this makes sure ppl are typing an actual email and just text. in terminal "npm i validator 
import bcrypt from "bcrypt"; // hashes passwords . in terminal "npm i bcrypt"

const userSchema = new Schema ({
    username :{
        type:String,
        trim:true, // for no white spaces
        unique:true,// for no username can be the same! 
        required:true, // gotta fill in this inorder to move forward
        minlength:2,
        maxlength:20,
    },
    password:{
        maxlength:15,
        minlength:8,
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,// there should be no white spaces in the email
        lowercase:true, // that way you dont have to write anything in capital letters 
        validator:{
            validator:validator.isEmail,
            message:"you have to type a vaild email!",
        },
    },
},
{timestamps:true,//that way it can say when it was created

}
);
        userSchema.pre('save',async function () { //the pre save will run before it saves the document to mongodb . an arrow function wont work right in ,referring to the current user document .
            if(!this.isModified("password")) return ;
            //if the password hasnt been updated or changed in anyway , then it'll keep it going without needing to be hashed again.
            this.password = await bcrypt.hash(this.password,10); // hashes 10 times 
        });



          userSchema.methods.comparedPassword = function(password){
            return bcrypt.compare(password,this.password)
          } // so basically it just wants to compare passwords

export const User=mongoose.model("User",userSchema);
