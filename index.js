const express = require('express');

const port = 8000;

const path = require('path')
const app = express();
const db = require('./config/db');
const flash = require('connect-flash')
app.set('view engine', 'ejs');

const cookieparser = require('cookie-parser')
const passport = require('passport');
const passportLocal = require('./config/passportlocal');
const session = require('express-session');
app.use(cookieparser())
app.use(session({
    name : 'users',
    secret : 'users',
    saveUninitialized : true, 
    resave : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
app.use(passport.setuser)

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/front')));

app.use('/',require('./routes/indexroutes'))

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`server is start on port : - ${port}`);
})