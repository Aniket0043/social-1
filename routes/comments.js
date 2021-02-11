const express=require('express');
const router = express.Router();
const passport =require('passport');

const commentsController=require("../controllers/comment_controllers")


router.post("/create",passport.checkAuthentication,passport.checkAuthentication,commentsController.create)
router.get("/destroy/:id",passport.checkAuthentication,passport.checkAuthentication,commentsController.destroy)
module.exports=router