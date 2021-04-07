const {validationResult} = require('express-validator')

const userValidate = (req,res,next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
       return res.render('register/register',{
            title:"title for sharing idea",
            errormsg:errors.array()[0].msg,
            userInput:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            }
        })
    }
    next()
}


module.exports = userValidate