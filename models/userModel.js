import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    profilePic:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    }
})

const UserModel = mongoose.model("User",userSchema);

export default UserModel;