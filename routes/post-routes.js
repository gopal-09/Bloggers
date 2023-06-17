const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth');
const {createPost,getall,updatepost,deletepost,pagenation,likepost,unlikepost,commentpost,delcommentpost}= require('../controllers/post-controllers')
//const Post = require('../models/posts');
router.post('/create',createPost);
//router.get('/getposts',auth,getall);
router.get('/getposts',getall);
router.put('/update/:id',auth,updatepost)
router.put('/likepost/:id',auth,likepost)
router.put('/unlikepost/:id',auth,unlikepost)
router.put('/delcommentpost/:id/:comment_id',auth,delcommentpost)
router.post('/commentpost/:id',auth,commentpost)
router.delete('/delete/:id',auth,deletepost)
router.get('/pagenation',pagenation)
module.exports=router;
