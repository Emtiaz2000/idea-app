const express = require('express')
const router = express.Router()
const {getRegisterControler,postRegisterControler,logOutControler} = require('../controlers/authControler')
const userValidator = require('../validation/userValidator')
const userValidate = require('../validation/userValidate')
const {loginControler,postLoginControler} = require('../controlers/login')
const {LoginChacker,logInvallidatinResult} = require('../validation/logInValidator')
const passport = require('passport')

router.get('/register',getRegisterControler)
router.post('/register',userValidator(),userValidate,postRegisterControler)
router.get('/login',loginControler)
router.post('/login',LoginChacker(),logInvallidatinResult,passport.authenticate('local',{
    failureRedirect:'/auth/login'
}), postLoginControler )
router.get('/logout',logOutControler)
module.exports = router