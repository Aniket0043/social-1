const express =require('express');
const port=8000;
const app = express();
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const expressLayouts=require("express-ejs-layouts")
const db=require("./config/mongoose")
const session=require("express-session");
const cookieParser=require("cookie-parser")
const passport=require("passport")
const passportLocal=require("./config/passport-local")
const MongoStore=require("connect-mongo")(session);
const flash=require("connect-flash")
const customMid=require("./config/middleware")
//use static-file
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//middleware
app.use(express.urlencoded())
app.use(expressLayouts)
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)



//use express router 

app.set("view engine","ejs")
app.set("views","./views")
//mongo store is used to store the session cokkie in thedb
app.use(session({
    name:"codial",
    secret:"aniket",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
       {
           mongooseConnection:db,
           autoRemove:"disabled",
           
       }, 
       function(err){
           console.log(err || "connect to the mongodb store")
       }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMid.setFlash);
app.use("/",require("./routes/index"))

app.listen(port,function(err){ 
    if(err){
        console.log(`error in serving file: ${err}`)
    }
    console.log(`server is running:${port}`)
})