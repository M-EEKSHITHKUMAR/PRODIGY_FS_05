import mongoose from "mongoose";
import UserModel from "./UserModel.js";
import PostModel from "./PostModel.js";


const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PostModel',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:true,
    },
    userName:{
        type:String,
       
    },
    text:{
        type:String,
        
        trim:true,
    },

},{timestamps:true});


export default mongoose.model('CommentModel',commentSchema);