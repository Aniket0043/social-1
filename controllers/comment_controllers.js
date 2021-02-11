const Comment= require("../models/comment")
const Post= require("../models/post")
const post = require("../routes")

module.exports.create=function(req,res){
    const post_1=req.body.post
    console.log(req.body.post)

    Post.findById(req.body.post,function(err, post){
        console.log(post)
        if(err){
            console.log("error in finding the user")
            return
        }
        if(post){
            console.log("post")
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            
            },function(err,comment){
                console.log("comment")
                
                post.comments.push(comment)
                post.save();
                res.redirect("/")
            }
            )
        }
    });

}
module.exports.destroy =function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        
        if(comment.user==req.user.id){
            let postId=comment.post;
            
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect("back");
            });

        }else{
            return res.redirect("back")

        }
    })
}