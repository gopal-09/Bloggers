const express=require('express')
const mongoose=require('mongoose')
const postRouter=require('./routes/post-routes')
const router= require('./routes/user-routes')
const app= express()
app.use(express.json())
require("dotenv").config()
app.use('/api/user', router)
app.use('/api/post',postRouter)
mongoose.connect(process.env.Mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.get('/',(req, res) => {
    res.sendFile('hello')
  })
app.listen(3000,(req,res)=>{console.log('server hitt')})
