const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth');
const {createPost,getall,updatepost,deletepost,pagenation}= require('../controllers/post-controllers')
//const Post = require('../models/posts');
router.post('/create',createPost);
router.get('/getposts',auth,getall);
router.put('/update/:id',auth,updatepost)
router.delete('/delete/:id',auth,deletepost)
router.get('/pagenation',pagenation)
module.exports=router;
