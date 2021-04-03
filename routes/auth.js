const express = require('express')
const router = express.Router()
const {getRegisterControler} = require('../controlers/authControler')

router.get('/register',getRegisterControler)


module.exports = router