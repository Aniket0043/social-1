const User=require("../models/user");
const mess_controller = require("./mess_controller");
module.exports.profile =function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render("profile",{
                    user:user
                })
            }
            return res.redirect("/user/sign-in")

        })

    }else{
        return res.redirect("/users/sign-in")
    }
}
module.exports.photos = function(req, res){
    res.end("<h1>user profile photo</h1>")
}
module.exports.login=function(req,res){
    return res.render("login",{
        title:"login"
    })
}
module.exports.signup=function(req,res){
    return res.render("sign_up",{
        title:"login"
    })
}
//get the sign up data
module.exports.create=function(req,res){
    return res.redirect("/")
}
module.exports.createsession=function(req,res){
    return res.redirect("/")
}
