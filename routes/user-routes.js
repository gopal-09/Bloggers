const express=require('express')
const {getAllUser,login,deleteuser,updateuser,signup}= require('../controllers/user-controllers')
const { check, validationResult } = require("express-validator");
const router=express.Router()
router.get('/',getAllUser);
router.post('/signup',[
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
],signup)//creation of user done in signup function
router.post('/login',login);
router.delete('/delete/:id',deleteuser)
router.put('/updateuser/:id',updateuser)

module.exports=router;