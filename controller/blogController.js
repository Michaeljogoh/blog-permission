const blogPost = require('../model/blogModel');
const router = require('../routes/blogRoutes');

// post 
const postBlog = async (req , res) =>{
    const {title , content , author } = req.body
    const postBlog = new blogPost({title , content , author});
    await postBlog.save();
    res.status(200).send('Blog Post Added');
};
// getPostBlog paginational
const getPostBlog = async (req , res) =>{
    // query with page limit 
    const {page = 1, limit = 5} = req.query;

    const getPosts = await blogPost.find()
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();
    //Get Total documents in blogPost collection
const count = await blogPost.countDocuments();
res.json({getPosts, totalPages:Math.ceil(count / limit), currentPage: page})
};

// search

const searchPostBlogs =  async (req , res)=>{
    const searchPostBlogs = await blogPost.find({'$or':[{title:{$regex:req.params.word.toLowerCase()}}]})
    res.status(200).json({searchPostBlogs})
}

module.exports = {postBlog  , getPostBlog, searchPostBlogs}