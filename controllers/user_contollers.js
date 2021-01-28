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
    console.log(req.body)
    if(req.body.password !==req.body.confirm_password){
        console.log("password is not matched")
        return;
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
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in login")
            return
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect("back")
            }
            res.cookie('user_id',user.id);
            return res.redirect("/user/profile")
        }
        else{
            return res.redirect("user/sign-in")

        }


    })

}
