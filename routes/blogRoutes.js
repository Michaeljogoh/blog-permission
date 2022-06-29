const express = require('express');
const app = express();
const router = express.Router();
const {postBlog , getPostBlog, searchPostBlogs } = require('../controller/blogController')


router.get('/', getPostBlog);

router.get('/search/:word', searchPostBlogs)

router.post('/postblogs', postBlog);




module.exports = router;