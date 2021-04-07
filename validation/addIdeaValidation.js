const {check,validationResult} = require('express-validator')


function checkData(){
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
    .notEmpty()
    .withMessage('Idea must have one tag')
    .trim()
    .isLength({min:1})
]

}

function checkError(req,res,next){
    const allowComment = req.body.allowComment ? true : false
    const errors = validationResult(req)
    req.body.tags = req.body.tags.split(',')
    console.log(errors.array())
    if (!errors.isEmpty()) {
        return res.render('ideas/new', {
            title: "add idea",
            errormsg: errors.array()[0].msg,
            ideaInput: {
                title: req.body.title,
                description: req.body.description,
                allowComment,
                status: req.body.status,
                tags:req.body.tags
            }
        })
    }else{
        next()
    }
}

module.exports = {
    checkData,
    checkError
}