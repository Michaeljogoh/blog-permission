const Users = require('../models/Users');
const bcrypt  = require('bcrypt');


// Register User
const registerUsers = async (req, res) =>{
    const {firstname, lastname , username, email , password , password2 , date} = req.body
    let errors = []
    // validation
    if(!firstname || !lastname|| !username || !email || !password || !password2){
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
        res.render({errors , firstname , lastname, username , email , password , password2})
    }  else {

   await Users.findOne({email:email})
    .then(user =>{
         if(user){
            errors.push({msg: "Email already exist"})
         } else {

    const newUser = new Users({firstname, lastname ,  username , email ,  password})
            //  hash password
     bcrypt.genSalt(10, ( err , salt)=>
          bcrypt.hash(newUser.password, salt, async (err,hash) =>{
                if(err) throw err;
                newUser.password = hash
                //save user
               await newUser.save();
                res.status(200).json({newUser});
              
        }))
    
  
    }
   })
}
 }


 module.exports = registerUsers;