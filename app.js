const express=require('express')
const mongoose=require('mongoose')
const postRouter=require('./routes/post-routes')
const router= require('./routes/user-routes')
const app= express()
app.use(express.json())
app.use('/api/user', router)
app.use('/api/post',postRouter)
mongoose.connect('mongodb://0.0.0.0:27017/varlyq', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.listen(3000,(req,res)=>{console.log('server hitt')})
