const express=require('express');
const router = express.Router();

const userController=require('../controllers/user_contollers')
router.get('/profile',userController.profile)
router.get('/photo',userController.photos);
module.exports=router;