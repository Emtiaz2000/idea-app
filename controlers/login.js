const User = require('../models/user')
const bcrypt = require('bcryptjs')

const loginControler = (req,res,next)=>{
    res.render('register/login',{
        title:"login"
    })
}
const postLoginControler = async (req,res)=>{
     // console.log(req.body)
    //const user = await User.findOne({email:req.body.loginEmail})
   // console.log(user)

    //my solution
    /* if(user.password = req.body.loginPassword){
        res.redirect('/')
    } */
// if(user){
//     const isMatch = await bcrypt.compare(req.body.loginPassword,user.password)
   // console.log(isMatch)
//     if(isMatch){
//        req.session.isLoggedIn = true
//        req.session.user = user
//         res.redirect('/ideas')
//     }else{
//         console.log('invalid login')
//     }
// }else{
//     console.log('invalid login')
// } 
req.flash('success_message',"login successfully")
console.log('login success')
res.redirect('/ideas')
 
}

module.exports ={
    loginControler,
    postLoginControler
}