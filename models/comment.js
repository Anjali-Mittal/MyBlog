const {Schema, model} = require('mongoose');

const commentSchems = new Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blog',
        required:true,
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
},{timestamps:true}
);

const Comment = model('comment', commentSchems);
module.exports = Comment;