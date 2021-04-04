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
   res.redirect('/')
}
module.exports={
    getRegisterControler,
    postRegisterControler
}