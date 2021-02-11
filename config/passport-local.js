const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const User=require("../models/user")

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true
},
function(req,email, password,done) {
    //find a user and establish the Identity
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err)
            return done(err)
        }
        if(!user||user.password!=password){
            req.flash('error',"invalid username/password")
            return done(null,false)
        }

        return done(null,user)   
    })


}
));
//serializer the user to decide which key is to be kept in the cookie_session
passport.serializeUser(function(user,done){
    console.log(user._id)
    done(null,user.id)
})
//deserialize the user from the key in the cookie_session
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
        console.log("error in finding user--passport")
        return done(err)
    }
    console.log(user)
    return done(null,user) 
})

})

//middleware for check authentication
passport.checkAuthentication=function(req,res,next){
    //if the user in sign in
    if(req.isAuthenticated()){
        return next();
    }
    ///user is not signed in
    return res.redirect("sign-in")
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
        return next();
    }
    next() 
}
module.exports=passport; 
