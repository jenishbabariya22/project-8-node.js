const passport = require('passport');
const usermodal = require('../models/userModel')
const passportlocal = require('passport-local').Strategy;   

passport.use(new passportlocal({
    usernameField : 'name'
},async(name,password,done)=>{
    try{
        let user = await usermodal.findOne({name : name});

        if(!user || user.password != password || user.role == 0){
            console.log("name and password are not match");
            return done(null,false)
        }

        return done(null,user)

    }catch(err){
        return done(null,false)
    }
}))


passport.serializeUser((user,done)=>{
    return done(null,user._id);
})

passport.deserializeUser(async(id,done)=>{
        try{
            const user = await usermodal.findById(id);
            return done(null,user);
        }catch(err){
            return done(null,false)
        }
})
passport.checkUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/admin'); 
}
passport.setuser = (req,res,next) => {

    if(req.isAuthenticated()){
        res.locals.users = req.user 
    }
   
    return next();
}

module.exports = passport