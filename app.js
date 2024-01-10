const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const seedDB = require('./seed')
const productRoutes = require('./routes/product')
const methodOverride = require('method-override')
const reviewRoutes = require('./routes/review')
const flash = require('connect-flash');
const session = require('express-session');

configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }

mongoose.connect('mongodb://127.0.0.1:27017/webproject')
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log("error is",err)})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//app.use(session(configSession));
//app.use(flash());

//app.use((req,res,next)=>{
//  res.locals.success = req.flash('success');
//  res.locals.error = req.flash('error');
//})

//seedDB();

app.use(productRoutes);
app.use(reviewRoutes);


let PORT = 8080;
app.listen(PORT,()=>{
    console.log(`server is connected at port ${PORT}`)
})