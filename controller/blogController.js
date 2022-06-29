const BlogPost = require('../models/blogModel');
const Users = require('../models/Users');
const bcrypt  = require('bcryptjs')



// Register User
 const registerUsers = (req, res) =>{
    const {firstname , lastname , email ,password , password2 , date} = req.body
    let errors = []
    // validation
    if(!firstname || !lastname || !email || !password || !password2){
     errors.push({msg: "Please fill in all fields"})
    }
    // if password is not match
    if(password !== password2){
     errors.push({msg: "Password does not match"})
    }
    // password must be six characters
    if(password < 6){
     errors.push({msg: "Password must not be less than six characters"})
    }

    // render form if no error caught
    if(errors < 0){
        res.render({errors , firstname , lastname , email , password , password2})
    }  else {

    Users.findOne({email:email})
    .then(user =>{
         if(user){
            errors.push({msg: "Email already exist"})
         } else {
    const newUser = new Users({firstname , lastname , email , password})
            //  hash password
    bcrypt.genSalt(salt, (err, salt)=>{
      bcrypt.hash(newUser.password, salt, (hash)=>{
            newUser.password = hash;
            // Save
            newUser.save();
                })
            })
         }
    })
    }
   
 }


// post 
const postBlogs = async (req , res) =>{
    const {title , content , author } = req.body
    await BlogPost.create({title , content , author});
    res.status(200).send('Blog Post Added');
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
    const searchPosts = await BlogPost.find({'$or':[{title:{$regex:req.params.word.toLowerCase()}}]})
    .limit(limit * 1)
    .skip((page - 1 ) * limit)
    .exec();
    //Get Total documents in blogPost collection
const search = await BlogPost.countDocuments();
    res.status(200).json({searchPosts,  totalPages:Math.ceil(search/ limit), currentPage: page});
}

// update
const updatePostBlogs = async (req , res ) =>{
    const {title , content , author} = req.body;
    if (req.body.author !== req.body.author) {
        res.status(404).send('Not Found')
    } else {
        await BlogPost.findByIdAndUpdate(req.params.id, {title , content , author});
        res.status(200).send("Updated!!!")
    }
   
 
}





module.exports = {postBlogs , getPostBlogs, searchPostBlogs, updatePostBlogs, registerUsers}