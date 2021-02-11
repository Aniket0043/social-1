const Post= require("../models/post")
const Comment= require("../models/comment")
module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
            req.flash('success',"post published")
            return res.redirect("back")

    }
    catch(err){
        req.flash('error',err)
        return res.redirect("back")
    }
}

module.exports.destroy = async function(req, res){
    try {
        let post=await Post.findById(req.params.id)
            //.id means converting the object into string
                    if(post.user==req.user.id){
                        post.remove();
                        await Comment.deleteMany({post:req.params.id})
                        req.flash('success',"post unpublished")
                        return res.redirect("back")
        
                    }else{
                        req.flash('success',"you can't delete")
                        return res.redirect("back")
                    }
    
    }catch (error) {
        req.flash('error',err)
        return res.redirect("back")

    }
}