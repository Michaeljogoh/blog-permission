const express = require('express');
const app = express();
const router = express.Router();
const {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs , deletePostBlogs} = require('../controller/blogController')
const { ensureAuthenticated } = require('../config/auth');





router.get('/', getPostBlogs);

router.get('/search/:word', searchPostBlogs);



router.post('/postblogs', ensureAuthenticated, postBlogs);

router.patch('/postblogs/:id', ensureAuthenticated, updatePostBlogs);

router.delete('/postblogs/:id', ensureAuthenticated, deletePostBlogs)




module.exports = router;