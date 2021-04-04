const express = require('express')
const router = express.Router()
const{aboutControler,
    homeControler,
    NotfountControler}= require('../controlers/ideaControlers')

    
    router.get('/',homeControler)

router.get('/contact',aboutControler)
router.get('*', NotfountControler) //we can also use router.use for that route

module.exports = router