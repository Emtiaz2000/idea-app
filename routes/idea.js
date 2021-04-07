const express = require('express')
const router = express.Router()
const Idea = require('../models/ideas')
const _ = require('lodash')
const mongoose = require('mongoose')
const {
    checkData,
    checkError
} = require('../validation/addIdeaValidation')
const {
    checkEditData,
    showData
} = require('../validation/editValidator')
//controlers
const {
    getIdeaControlers,
    getAddIdeaControler,
    postIdeaControler,
    getSingleIdeaControler,
    getEditControler,
    UpdateControler,
    deletIdeaControler
} = require('../controlers/ideaControlers')

const isAuth = require('../helpers/isAuth')

/* function docx(id, title, description, status, allowComment) {
    return {
        id,
        title,
        description,
        status,
        allowComment
    }
} */

router.get('/', getIdeaControlers)

//show form to show idea

router.get('/new',isAuth, getAddIdeaControler)


router.post('/',isAuth, checkData(), checkError, postIdeaControler)

router.get('/:id', getSingleIdeaControler)

//get idea for edit 
router.get('/:id/edit',isAuth, getEditControler)

//update ideas
router.put('/:id',isAuth, checkEditData(), showData, UpdateControler)

//delete idea
router.delete('/:id',isAuth,deletIdeaControler)


module.exports = router