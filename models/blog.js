const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageUrl:{
        type: String,
        required: false,
    },
    CreatedBy:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
},{timestamps: true});

const Blog = model("blog", BlogSchema);
module.exports = Blog;