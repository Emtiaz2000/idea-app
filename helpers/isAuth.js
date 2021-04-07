

const isAuth = (req,res,next)=>{
    //console.log(req.session.isLoggedIn)
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/auth/login')
    }
}

module.exports = isAuth