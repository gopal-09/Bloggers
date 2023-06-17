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
        return res.status(201).json({savedPost});
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({msg:'Server Error'});
      }
}
getall=async (req, res, next) => {
  try{
    const posts = await Post.find().populate('createdBy', 'name email mobile');
    console.log(posts)
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
    const { message,comments } = req.body;
    const email =req.user
    const user = await User.findOne({email})
    let post = await Post.findOne({ _id: new objectId(postId), createdBy: user._id });
    if (!post) {
      return res.status(404).json({msg:'Post not found or unauthorized to update'});
    }
    try{
      post= await Post.findByIdAndUpdate(req.params.id,{message,comments})
      console.log(post);
   }
   catch(err){
       console.log(err);
   }

    const updatedPost = await post.save();
    res.status(200).json({msg:"post updated successfully"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:'Server Error'});
  }

}
deletepost=async(req,res,next)=>{
  let postId=req.params.id;
  const email =req.user
  const objectId = mongoose.Types.ObjectId;
  let post
  try{
    const user = await User.findOne({email})
     post = await Post.findOneAndDelete({ _id:postId, createdBy: user._id });}
    catch(err){
      console.log(err)
    }
    if (!post) {
      return res.status(404).json({msg:'Post not found or unauthorized to update'});
    }

  
  try{
  return res.json({msg:"post deleted successfully"})}
  catch(err){
    console.log(err);
  }
}
likepost=async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (!post) 
      return res.status(400).json({ msg: "post not found" });
    const userId=req.user
    const id=await User.findOne({ email:userId });
    if (
     post.likes.includes(userId)
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.push(id._id);
    await post.save();

    res.json(post);
   
}catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
unlikepost=async(req, res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (!post) 
      return res.status(400).json({ msg: "post not found" });
    
    const userId=req.user
    const id=await User.findOne({ email:userId });
    const posts = await Post.findByIdAndUpdate(req.params.id,{$pull:{likes:id._id}}, { new: true,runValidators: true  }); 
    await posts.save();

    res.json(posts);
   
}catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
commentpost=async(req,res) => {
  try {
    const userId=req.user
    const id=await User.findOne({ email:userId });
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            sentBy: id._id,
            comment: req.body.comment,
            sentAt: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );
     await updatedPost.save()
    if (!updatedPost) {
      console.log('Post not found');
    } else {
      return res.json({msg: 'comment added'})
    }
  } catch (error) {
    console.error(error);
  }
}
delcommentpost=async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }
    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.params.comment_id } } },
      { new: true }
    );
    await updatedPost.save();
    res.json('comment deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

pagenation=async(req,res)=>{
  itemsPerPage=1;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * itemsPerPage
  try {
    const blogs = await Post.find().skip(skip).limit(itemsPerPage);
    return res.json({
      blogs,
      currentPage: page
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports ={createPost,getall,updatepost,deletepost,pagenation,likepost,unlikepost,commentpost,delcommentpost,delcommentpost};