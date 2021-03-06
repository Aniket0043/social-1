const express = require("express");
const router=express.Router()
const homeController = require("../controllers/home_controller")

router.get('/',homeController.home)
router.use('/user',require("./user"))
router.use("/posts",require("./post"))
router.use("/comments",require("./comments"))
router.use("/message",require("./message"))
console.log("router loaded")


module.exports=router;


