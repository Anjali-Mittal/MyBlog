require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const Blog = require('./models/blog');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkforAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforAuthenticationCookie('token'));
app.use(express.static(path.resolve("./public")));


app.get('/', async (req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return res.render('home',{
            user: req.user,
            blogs: blogs || []
        });
    } catch (err) {
        console.error('Error fetching blogs:', err.message);
        return res.render('home', { user: req.user, blogs: [] });
    }
});

mongoose.connect(process.env.MONGO_URL).
then((e)=>{console.log('MongoDB Connected')});

app.use('/user',userRoute);
app.use('/blog',blogRoute);
app.listen(PORT, () => {console.log(`Server is running on PORT ${PORT}`);});