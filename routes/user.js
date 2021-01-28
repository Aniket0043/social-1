const express=require('express');
const router = express.Router();

const userController=require('../controllers/user_contollers')
router.get('/profile',userController.profile)
router.get('/sign-in',userController.login)
router.get('/sign-up',userController.signup)
//create the user
router.post('/create',userController.create)
//authenticate the user
router.post('/create-session',userController.createsession)
router.get('/photo',userController.photos);
module.exports=router; 