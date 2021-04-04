const express = require('express')
const router = express.Router()
const {getRegisterControler,postRegisterControler} = require('../controlers/authControler')
const userValidator = require('../validation/userValidator')
const userValidate = require('../validation/userValidate')

router.get('/register',getRegisterControler)
router.post('/register',userValidator(),userValidate,postRegisterControler)

module.exports = router