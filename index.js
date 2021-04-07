const express = require("express");
require('express-async-errors')
const app = express();
const exphbs = require('express-handlebars')
const {
    compareValues,
    trncatedContent
} = require('./helpers/hbs')
 
const methodOverride = require('method-override')
const path = require('path')

const ideaRoute = require('./routes/idea')
const connectDb = require('./config/db')
const pageRoute = require('./routes/otherRoute')
const authRoute = require('./routes/auth')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')
 require('./config/passport').localStrategy(passport)
const flash = require('connect-flash')




/* const store = new MongoStore({
    url:'mongodb://localhost:27017/Idea-app'
}) */
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        compareValues,
        trncatedContent
    }
}))
app.set('view engine', '.hbs')

//database connection

connectDb()

//middelWare
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")))


app.use(session({
    secret:"this is the key",
    resave:false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Idea-app' }),
    saveUninitialized:false,
    cookie:{
        maxAge:2*60*100*1000,
        httpOnly:true,
        sameSite:'lax'
    }

}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    // console.log(req.session.user)
    // console.log(req.session.isLoggedIn)
    next()
})
// const isAuth = (req,res,next)=>{
//     // console.log(req.cookies.isLogin)

//     // if(req.cookies.isLogin === 'true'){
//     //     next()
//     // }else{
//     //     res.redirect('/auth/login')
//     // }
//     if(req.session.isLoggedIn ==="true"){
//         next()
//     }else{
//         res.redirect('/auth/login')
//     }
    
// }

/* let ideas = [{
        id: 1,
        title: 'Idea 1',
        description: "Idea 1 description",
        allowComment: true,
        status: "public"
    },
    {
        id: 2,
        title: 'Idea 2',
        description: "Idea 2 description",
        allowComment: false,
        status: "public"
    },
    {
        id: 3,
        title: 'Idea 3',
        description: "Idea 3 description",
        allowComment: true,
        status: "private"
    }
] */


app.use((req,res,next)=>{
   res.locals.user = req.user || null
   res.locals.success_message = req.flash("success_message")
  console.log(req.user)
   next()
})

//route middlere
app.use("/auth",authRoute)
app.use('/ideas',ideaRoute)
app.use(pageRoute)


app.use((err,req,res,next)=>{
    console.log(err)
    res.render('pages/notfound')
})

app.listen(3000, () => {
    console.log('port is lisening')
})