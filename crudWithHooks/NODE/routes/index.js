const express=require('express')
const router=express.Router()

const{createUser}=require('./APIs/register')
const{loggedIn}=require('./APIs/login')
const {getUser}=require('./APIs/fetch')
const{updateUser}=require('./APIs/update')
const{deleteUser}=require('./APIs/delete')

router.post('/signup',createUser)
router.post('/signin',loggedIn)
router.get('/getData/:uid',getUser)
router.put('/update/:uid',updateUser)
router.delete('/delete/:uid',deleteUser)

module.exports= router
