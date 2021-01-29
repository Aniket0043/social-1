const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const User=require("../models/user")

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:"email"
},
function(email, password,done) {
    //find a user and establish the Identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding user--->Passport")
            return done(err)
        }
        if(!user||user.password!=password){
            console.log("invalid username/password");
            return done(null,false)
        }
        return done(null,user)   
    })


}
));
//serializer the user to decide which key is to be kept in the cookie_session
passport.serializeUser(function(user,done){
    done(null,user.id)
})
//deserialize the user from the key in the cookie_session
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
        console.log("error in finding user--passport")
        return done(null,err)
    }
    return done(null,err) 
});
})
module.exports=passport; 
