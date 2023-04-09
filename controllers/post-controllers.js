const { response } = require('express')
const mongoose = require('mongoose')

const User = require('../models/users')
const Post=require('../models/posts')
createPost=async (req,res)=>{
    try {
        const { createdBy, message } = req.body;
        const post = new Post({
          createdBy,
          message
        });
    const savedPost = await post.save();
        return res.status(201).json(savedPost);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
      }
}
getall=async (req, res, next) => {
  try{
    const posts = await Post.find().populate('createdBy', 'name email mobile');
    res.json(posts);}
   catch (error) {
    console.log(error);
   }
   
}
updatepost=async (req, res, next) => {
  try {
    const objectId = mongoose.Types.ObjectId;
    console.log(req.params);
    const  postId  = req.params.id;
    console.log(postId);
    const { createdBy,message,comments } = req.body;
    const email =req.user
    // console.log(userId)
    const user = await User.findOne({email})
    let post = await Post.findOne({ _id: new objectId(postId), createdBy: user._id });
    // console.log(post);
    if (!post) {
      return res.status(404).send('Post not found or unauthorized to update');
    }
    try{
      post= await Post.findByIdAndUpdate(req.params.id,{createdBy,message,comments})
   }
   catch(err){
       console.log(err);
   }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

}
deletepost=async(req,res,next)=>{
  let postId=req.params.id;
  const userId =req.user
    console.log(userId)
    const post = await Post.findOne({ _id: postId, createdBy: userId });
    if (!post) {
      return res.status(404).send('Post not found or unauthorized to update');
    }

  try{
        let post= await Post.findByIdAndDelete(postId)
        await post.save()
  }
  catch (error) {
    console.log(error.message);
  }
  return res.json({msg:"post deleted successfully"})
}


module.exports ={createPost,getall,updatepost,deletepost};