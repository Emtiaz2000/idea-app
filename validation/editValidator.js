const {
    check,
    validationResult
} = require('express-validator')

function checkEditData() {
    return [check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({
            min: 2,
            max: 50
        })
        .withMessage('title must be between 2 to 50 words'),

        check('description', "description must be between 10000 words")
        .isLength({
            max: 10000
        }),

        check('status')
        .notEmpty()
        .withMessage('status is required')
        .isIn(['public', 'private'])
        .withMessage('status must be public or private'),
        check('tags')
        .trim()
        .isLength({min:1})
        .notEmpty()
        .withMessage('Idea must have one tag')
    ]
}

function showData(req, res, next) {
    const id = req.params.id
    const errors = validationResult(req)
    const allowComment = req.body.allowComment ? true : false;
    req.allowComment = allowComment;
    if (!errors.isEmpty()) {
        res.render('ideas/edit', {
            title: "edit idea",
            errormsg: errors.array()[0].msg,
            idea: {
                id,
                title: req.body.title,
                description: req.body.description,
                allowComment,
                status: req.body.status,
                tags:req.body.tags
            }
        })
    } else {
        next()
    }
}

module.exports = {
    checkEditData,
    showData

}