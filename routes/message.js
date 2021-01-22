const express = require('express');
const router=express.Router();
const message=require("../controllers/mess_controller")
router.get('/user1',message.user1)
module.exports =router;