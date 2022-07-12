import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    owner: { type:mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
    text: { type: String, required:true },
    post: { type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment" },
    createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;