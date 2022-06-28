const blogPost = require('../model/blogModel');
const router = require('../routes/blogRoutes');

// post 
const postBlogs = async (req , res) =>{
    const {title , content , author } = req.body
    const postBlog = new blogPost({title , content , author});
    await postBlog.save();
    res.status(200).send('Blog Post Added');
};
// getPostBlog paginational
const getPostBlogs = async (req , res) =>{
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

// update
const updatePostBlogs = async (req , res ) =>{
    const {title , content , author} = req.body;
    if (req.body.author !== req.body.author) {
        res.status(404).send('Not Found')
    } else {
        await blogPost.findByIdAndUpdate(req.params.id, {title , content , author});
        res.status(200).send("Updated!!!")
    }
   
}







module.exports = {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs}