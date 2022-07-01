const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');


module.exports = async (passport) =>{ 
    passport.use(
        new LocalStrategy ({usernameField: 'username'}, async (username, password , done) =>{
            //match user
         await Users.findOne({username:username})
            .then(user =>{
                if(!user){
                  return done (null , false , {message:"Username is registerd"})
                }
                // match password
               bcrypt.compare(password, user.password, async (isMatch)=>{
                    if(isMatch){
                        await user
                    } else {
                        res.status(404).send(false)
                    }
                    
                });
            })
            .catch(err=> console.log(err))
        })
        
    )

//    serialize users
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
    //  deserializer  users
      passport.deserializeUser  ( async (id, done)=> {
    await Users.findById(id, function(err, user) {
          done(err, user);
        });
      });
      


}
