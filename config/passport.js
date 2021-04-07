const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')



const localStrategy = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField:"email"

    },
  async  function(email,password,next){
    const user = await User.findOne({email})

    if(!user){
       return next(null,false,{message:"Invalid login"})
    }else{
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
           next(null,user,{message:"successfully loogedin"})
            //req.session.isloggedIn = true
            
        }else{
          return   next(null,false,{message:"Invalid login"})
        }
    }
   }))

   passport.serializeUser((user,next)=>{
       next(null,user)
   })

   passport.deserializeUser(async (id,next)=>{
    const user = await User.findById(id)
    next(null,user)
})
}

module.exports = {
    localStrategy
}