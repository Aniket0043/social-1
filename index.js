const express =require('express');
const port=8000;
const app = express();
const bodyParser=require("body-parser")
const expressLayouts=require("express-ejs-layouts")
const db=require("./config/mongoose")
const session=require("express-session");
const cookieParser=require("cookie-parser")
const passport=require("passport")
const passportLocal=require("./config/passport-local")
//use static-file
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//middleware
app.use(express.urlencoded())
app.use(expressLayouts)
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)
app.use(passport.initialize());
app.use(passport.session());


//use express router 
app.use("/",require("./routes/index"))
app.set("view engine","ejs")
app.set("views","./views")
//
app.use(session({
    name:"codial",
    secret:"codial",
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.listen(port,function(err){
    if(err){
        console.log(`error in serving file: ${err}`)
    }
    console.log(`server is running:${port}`)
})