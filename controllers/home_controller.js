const router = require("../routes")

module.exports.home=function(req, res){
    return res.render("home",{
        title:"home"
    })
}
