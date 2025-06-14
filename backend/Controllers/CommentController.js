import mongoose from "mongoose";
import PostModel from "../Models/PostModel";
import CommentModel from "../Models/CommentModel";
import UserModel from "../Models/UserModel";

const addComment=async(req,res)=>{
    try{
        const {postId,userId,text}=req.body;

        if(!postId || !userId ||!text){
            return res.status(400).json({error:"Missing required feilds"});

        }

        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({error:"Post not found"});
        }
        const user=await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        const comment=new CommentModel({
            postId,userId,userName:user.username,
            text,
        });

        const savedComment=await CommentModel.save();
        return res.status(200).json(savedComment);
    }
}