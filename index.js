const express =require('express');
const port=8000;
const app = express();
const bodyParser=require("body-parser")
const expressLayouts=require("express-ejs-layouts")
const db=require("./config/mongoose")
const cookieParser=require("cookie-parser")

//use static-file
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//attraction
app.use(express.urlencoded())
app.use(expressLayouts)
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)

//use express router 
app.use("/",require("./routes/index"))
app.set("view engine","ejs")
app.set("views","./views")


app.listen(port,function(err){
    if(err){
        console.log(`error in serving file: ${err}`)
    }
    console.log(`server is running:${port}`)
})