const User=require("../models/user");
const mess_controller = require("./mess_controller");
const passport=require("passport")
module.exports.profile =function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render("profile",{
            title:"User profile",
            profile_user:user
        })
    })
    
}

module.exports.update=function(req, res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect("back")
        })
    }else{
        return res.status(401).send("unathrised")
    }
}
module.exports.photos = function(req, res){
    res.end("<h1>user profile photo</h1>")
}
module.exports.login=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect("/user/profile")
    }
    return res.render("login",{
        title:"login"
    })
}
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/user/profile")
    }
    return res.render("sign_up",{
        title:"login"
    })
}
//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!==req.body.confirm_password){
        console.log('body disabled')
        return res.redirect("back")
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding the user")
            return
        }
        if(!user){
            User.create(req.body,function(err,data){
                if(err){
                    console.log("error in saving user")
                    return
                }
                return res.redirect("/user/sign-in")
            })
        }else{
            return res.redirect("back")
        }
        
    })

}

//sign in and create a session for the user 
module.exports.createsession=function(req,res){
    req.flash("success","logged in successfully")
    console.log(req.cookies)
    res.redirect("/")
}
module.exports.destroySession=function(req,res){
    req.logout()
    req.flash("success","logged in successfully")
    return res.redirect("/");
}