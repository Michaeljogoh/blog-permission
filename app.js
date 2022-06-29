const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');
const { connect } = require('http2');


//DB
mongoose.connect(process.env.blog_DB , {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('MongoDB'))
.catch(err => console.log(err));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(blogRoutes)



const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
});
