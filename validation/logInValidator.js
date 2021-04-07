const {check,validationResult} = require('express-validator')

const LoginChacker = (req,res)=>{
    return [
        check('email')
        .notEmpty()
        .withMessage('please provide email address')
        .isEmail()
        .withMessage('please provide valid email')
        .normalizeEmail(),

        check('password')
        .notEmpty()
        .withMessage('please provide password')
        .isLength({min:6,max:30})
        .withMessage('password contain more than 6 character')
    ]
}


const logInvallidatinResult = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('register/login',{
            title:'login',
            errormsg:errors.array()[0].msg,
            loginInput:{
                loginEmail:req.body.email
            }
        })
    }else{
        next()
    }
}



module.exports = {
    LoginChacker,
    logInvallidatinResult
}