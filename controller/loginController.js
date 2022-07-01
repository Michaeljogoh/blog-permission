//    Login 
const loginUsers = (req , res , next)  =>{
    passport.authenticate('local', {
        successRedirect:"/",
        failureRedirect:"/login",
        failureFlash:true
    })
    next();

}

module.exports  = loginUsers;