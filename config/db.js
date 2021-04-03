const mongoose = require('mongoose')

module.exports =  async function connectDb(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Idea-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
           
        })
        console.log('database is connected')
        
    } catch (error) {
        console.log(error)
    }

   
    
}