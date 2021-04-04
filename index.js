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