const {check}=require('express-validator')
const User = require('../models/user')
const registerValidator = ()=>{
    return [
        check('firstName')
        .notEmpty()
        .withMessage('First name must be required')
        .isLength({min:3,max:50})
        .withMessage('First name must contain 3 chracter')
        .trim(),
        check('lastName')
        .notEmpty()
        .withMessage('Last name must be required')
        .isLength({min:3,max:50})
        .trim()
        .withMessage('Last name must contain 3 chracter'),

        check('email')
        .notEmpty()
        .withMessage('Email must be required')
        .isEmail()
        .withMessage("please provide valid email")
        .normalizeEmail(),

        check('email')
        .custom(async (email)=>{
            const user = await User.findOne({email:email})
            if(user){
                throw new Error("This email is already exist")
            }else{
                return true
            }
        }),


        check('password')
        .notEmpty()
        .withMessage("please provide a password")
        .isLength({min:6,max:30})
        .withMessage('password must more than 6 character')
        .not()
        .isIn(['password','123456','god123'])
        .withMessage('password can not common password'),


        check('confirmPassword')
        .notEmpty()
        .withMessage("please provide a password")
        .custom((Confirmpassword,{req})=>{
            if(Confirmpassword === req.body.password){
                return true
            }else{
                throw new Error('Password must be same ')
            }
        })
        
    ]
}

module.exports = registerValidator