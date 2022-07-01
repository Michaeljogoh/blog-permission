const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const passport  = require('passport');
require('./config/passport')(passport);
const session = require('express-session');


//DB
mongoose.connect(process.env.blog_DB , {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('MongoDB'))
.catch(err => console.log(err));


// session 

app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized: true
}));



// passport
app.use(passport.initialize());
app.use(passport.session());



// cross origin
app.use(cors());
// bodyparser
app.use(express.json());
// form-encoded extension
app.use(express.urlencoded({extended:true}));

// Routes
app.use(blogRoutes);
app.use(userRoutes);



const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
});
