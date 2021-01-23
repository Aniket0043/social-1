const mongoose=require("mongoose")
mongoose.connect("")
const db=mongoose.connection
db.on("error",function(err){
    console.log("error")
})
db.on("error",function(err){
    console.log("connect to the database")
})