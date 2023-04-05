const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth');
const {createPost}= require('../controllers/post-controllers')
//const Post = require('../models/posts');
router.post('/create',createPost);
router.get('/getposts',auth,getall);
router.put('/update/:id',auth,updatepost)
router.delete('/delete/:id',auth,deletepost)
module.exports=router;
