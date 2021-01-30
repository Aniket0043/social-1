const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://dbUser:WxvQ1ezFcN3Etamc@cluster0.0vs6g.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true });
const db=mongoose.connection
db.on("error",function(err){
    console.log("error",err)
})
db.once("open",function(){
    //console.log("connect to the database")
})
module.exports =db;

