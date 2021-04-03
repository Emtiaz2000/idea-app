const express = require('express')
const router = express.Router()

const {
    isEmpty
} = require("lodash");
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

router.get('/new', getAddIdeaControler)


router.post('/', checkData(), checkError, postIdeaControler)

router.get('/:id', getSingleIdeaControler)

//get idea for edit 
router.get('/:id/edit', getEditControler)

//update ideas
router.put('/:id', checkEditData(), showData, UpdateControler)

//delete idea
router.delete('/:id',deletIdeaControler)


module.exports = router