module.exports.profile =function(req, res){
    console.log('user/profile')
    res.end("<h1>user profile routes</h1>")
}
module.exports.photos = function(req, res){
    res.end("<h1>user profile photo</h1>")
}
