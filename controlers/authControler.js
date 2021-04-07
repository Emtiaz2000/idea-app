const User = require('../models/user')

const getRegisterControler = (req,res)=>{
    res.render('register/register',{
        title:"register"
    })
}

const postRegisterControler = async (req,res)=>{
    
    const user = new User(req.body)
   await user.save()
   console.log(req.body)
   req.flash('success_message',"registration successfully")
   res.redirect('/auth/login')
}

const logOutControler =async (req,res)=>{
    // res.clearCookie('isLogin')
    req.logout()
    req.flash('success_message',"logout successfully")
    console.log('logout success')
    res.redirect('/auth/login')
}

module.exports={
    getRegisterControler,
    postRegisterControler,
    logOutControler
}