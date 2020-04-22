const express=require('express')
const router=express.Router()

const {createUser,loggedIn,loggedOut,uploadS3,getData,deleteData} = require('./routes');


// router.get('/user',getUsers);
router.post('/signup',createUser)
router.post('/signin',loggedIn)
router.post('/signout',loggedOut)
router.post('/upload',uploadS3)
router.post('/getData',getData)
router.post('/deleteData',deleteData)


module.exports=router;