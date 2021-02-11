const router = require("../routes")
const Post=require("../models/post")
const User=require("../models/user")
module.exports.home= async function(req, res){ 
    //populate the user
    try{
        let posts=await Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
     })
    let users=await User.find({})
    return res.render("home",{
        title:"home",
         posts:posts,
        all_users:users   
        })
        
    }catch(err){
        console.log(err)
        return;
    }
}
