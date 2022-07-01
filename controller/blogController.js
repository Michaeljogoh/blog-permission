const BlogPost = require('../models/blogModel');


// post 
const postBlogs = async (req , res) =>{
    const {title , content , author } = req.body
  const newBLogs =  await BlogPost.create({title , content , author});
    res.status(200).json({newBLogs});
};

// getPostBlog paginational
const getPostBlogs = async (req , res) =>{
    // query with page limit 
    const {page = 1, limit = 5} = req.query;

    const getPosts = await BlogPost.find()
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();

    //Get Total documents in blogPost collection
const count = await BlogPost.countDocuments();
res.json({getPosts, totalPages:Math.ceil(count / limit), currentPage: page})
};

// search
const searchPostBlogs =  async (req , res)=>{
    const {page = 1, limit = 5} = req.query;
    const searchPosts = await BlogPost.find({'$options':[{title:{$regex:req.params.word}}]})
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();
    
    //Get Total documents in blogPost collection
const search = await BlogPost.countDocuments();
    res.status(200).json({searchPosts,  totalPages:Math.ceil(search/ limit), currentPage: page});
}

// update
const updatePostBlogs = async (req , res ) =>{
    const {title , content , author } = req.body;
    if (author !== author) {
        res.status(404).send('Not Found')
    } else {
     const newUpdatePostBlogs =  await BlogPost.findByIdAndUpdate(req.params.id, {title , content , author});
        res.status(200).json({newUpdatePostBlogs})
    }
   
 
}

const deletePostBlogs = async (req , res) =>{
    const {title , content , author } = req.body;
    if(author !== author ){
        res.status(400).send('Can not delete the post')
    } else {
    const newDeletePostBlog =  await BlogPost.findByIdAndDelete(req.params.id, {title , content , author});
        res.status(200).json({newDeletePostBlog})
    }
    }
    





module.exports = {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs, deletePostBlogs}