const { response } = require('express')
const User=require('../models/users')
const JWT = require("jsonwebtoken")

 const bcrypt =  require('bcryptjs')
 const { check, validationResult } = require("express-validator");
const { findById } = require('../models/users');
const getAllUser = async (req, res, next) => {
    let users;
    try {
        
        users = await User.find();}
catch (error) {
        console.log(error);}
        res.status(200).json({users});
}
 const signup= async (req,res,next) => {
    const{name,email,mobile,password}=req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    res.send("validation error: " + errors)
    else{
     let existingUser;
     try {
         existingUser = await User.findOne({name}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
            //console.log(existingUser)
              res.json({message:'user exist'})  
         }
         else{
         const hashedPassword=bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                mobile,
                password:hashedPassword
                
         }) ;
         
         try {
             await user.save();
         }
         catch (error) {
             console.log(error);
         }
         const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
        console.log(token);
          return res.status(200).json({user: user})
        }
    }
}

    
    login= async (req, res) => {
    const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
            //let isMatch = await bcrypt.compare(req.body.password,user.password);
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        else{
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        else{
            const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
             console.log(token);
            
        return res.status(200).json({message:"login success",token:token})}
    }
}
updateuser=async(req, res)=>{
    //console.log("hoi");
    // let user;
   let user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message:"User not found"})
    try{
       user = await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email
    })
    }
    catch(err){
        console.log(err);
    }
    await user.save();
    return res.json({user:user});
},
deleteuser=async(req, res)=>{
    let user;
    let id=req.params.id;
    user=await User.findById({id})
    console.log(user)
    if(!user){
        return res.json({msg:"No user found"})
    }
    let a=await User.findByIdAndDelete(req.params.id)
    await a.save();
    return res.json({msg:"user deleted successfully"})
}




module.exports = {getAllUser,signup,login,updateuser,deleteuser}