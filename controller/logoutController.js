// Logout
const logoutUsers = (req,res)=>{
    req.logout();
    res.redirect('/login');
}

module.exports = logoutUsers;