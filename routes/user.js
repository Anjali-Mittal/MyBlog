const {Router} = require('express');
const User = require('../models/user');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router = Router();

router.get('/signup',(req,res)=>{
    return res.render('signUp', {error: null})
})
router.get('/signin',(req,res)=>{
    return res.render('signIn', {error: null})
});

router.post('/signup',async (req,res)=>{
    try {
      const { fullName, email, password } = req.body;
      console.log('Signup attempt:', { fullName, email });
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if(existingUser) {
        return res.render('signUp', { error: 'Email already registered' });
      }
      await User.create({
        fullName,
        email,
        password,
      });
      const token = await User.matchPassword(email, password);
      console.log('Sign Up successful');
      return res.cookie("token", token).redirect("/");
    } catch (err) {
      console.error('Signup error:', err.message);
      return res.render('signUp', { error: err.message });
    }
})

router.post('/signin', async (req,res)=>{
  const {email,password} = req.body;
  try {
    // User.matchPassword returns a token (JWT)
    const token = await User.matchPassword(email, password);
    console.log('Sign in successful');
    return res.cookie("token", token).redirect("/");
  }catch (error) {
    console.error('Sign in error:', error.message);
    return res.render("signIn", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.delete("/:id", async (req, res) => {
  try {
    // Check if user is deleting their own account or is admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'You do not have permission to delete this account' });
    }
    // Find all blogs created by this user
    const userBlogs = await Blog.find({ CreatedBy: req.params.id });
    const blogIds = userBlogs.map(blog => blog._id);
    // Delete all comments on those blogs
    await Comment.deleteMany({ blogId: { $in: blogIds } });
    // Delete all blogs created by this user
    await Blog.deleteMany({ CreatedBy: req.params.id });
    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    // Clear cookie and redirect
    res.clearCookie("token").json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err.message);
    return res.status(500).json({ error: 'Error deleting account' });
  }
});

module.exports = router;