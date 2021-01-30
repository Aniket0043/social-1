const express=require('express');
const router = express.Router();
const passport=require("passport");
const userController=require('../controllers/user_contollers')
router.get('/profile',passport.checkAuthentication,userController.profile)
router.get('/sign-in',userController.login)
router.get('/sign-up',userController.signup)
//create the user
router.post('/create',userController.create)
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate("local",{failureRedirect:"/user/sign-in"}),userController.createsession)

router.get('/photo',userController.photos);
router.get('/sign-out',userController.destroySession);

module.exports=router; 