const {Router} = require('express');
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const path = require('path');
const multer = require('multer');
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addblog',{
        user: req.user,
    });
});

router.get('/:id',async (req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id).populate('CreatedBy');
        const comments = await Comment.find({blogId: req.params.id}).populate('CreatedBy');
        if (!blog) {
            return res.status(404).render('error', { message: 'Blog not found' });
        }
        console.log(blog);
        return res.render('blog',{
            user: req.user,
            blog,
            comments,
        });
    } catch (err) {
        console.error('Error fetching blog:', err.message);
        return res.status(500).render('error', { message: 'Error loading blog' });
    }
});

router.post('/comment/:id',async (req,res)=>{
    try {
        const blogId = req.params.id;
        await Comment.create({
            content: req.body.content,
            blogId: blogId,
            CreatedBy: req.user._id,
        });
        return res.redirect(`/blog/${blogId}`);
    } catch (err) {
        console.error('Error creating comment:',err.message);
        return res.status(500).render('error',{message:'Error adding comment'});
    }
});

router.post('/',upload.single('coverImage'),async (req,res)=>{
    try {
        const {title,body} = req.body;
        if (!title || !body) {
            return res.status(400).render('addBlog', {
                user: req.user,
                error: 'Title and body are required'
            });
        }
        const blog = await Blog.create({
            title,
            body,
            coverImageUrl: req.file ? `/uploads/${req.file.filename}` : '/images/default.png',
            CreatedBy: req.user._id,
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        console.error('Error creating blog:', err.message);
        return res.status(500).render('addBlog', {
            user: req.user,
            error: 'Error creating blog'
        });
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        // Checking if the user is the creator or an admin
        if (blog.CreatedBy.toString()!==req.user._id.toString() && req.user.role!=='ADMIN') {
            return res.status(403).json({ error:'You do not have permission to delete this blog'});
        }
        
        // Delete all comments associated with this blog
        await Comment.deleteMany({ blogId: req.params.id });
        // Delete the blog
        await Blog.findByIdAndDelete(req.params.id);
        
        return res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err.message);
        return res.status(500).json({ error: 'Error deleting blog' });
    }
});

router.delete('/comment/:commentId', async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        // Get the blog to check if user is blog owner
        const blog = await Blog.findById(comment.blogId);
        
        // Check if user is the comment author, blog owner, or admin
        if (comment.CreatedBy.toString() !== req.user._id.toString() && 
            blog.CreatedBy.toString() !== req.user._id.toString() && 
            req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'You do not have permission to delete this comment' });
        }
        
        // Delete the comment
        await Comment.findByIdAndDelete(req.params.commentId);
        
        return res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err.message);
        return res.status(500).json({ error: 'Error deleting comment' });
    }
});

module.exports = router;