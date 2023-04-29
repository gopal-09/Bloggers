const mongoose=require('mongoose')
const Schema=mongoose.Schema;
//const SchemaTypes=mongoose;
    const postSchema=new Schema({
        createdBy: {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          required: true
        },
        updatedAt: {
          type: Date,
          default: Date.now,
          required: true
        },
        message: {
          type: String,
          required: true
        },
        comments: [
          {
            sentBy: {
              type:mongoose.Schema.Types.ObjectId,
              ref: 'user',
              required: true
            },
            comment:{
              type: String,
              required: true
            },
            sentAt: {
              type: Date,
              default: Date.now,
              required: true
            },
            liked: [
              {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'user'
              }
            ]
          }
        ]
      }
      )
      
  module.exports= mongoose.model('post',postSchema);