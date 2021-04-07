const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'first name must be contain 3 chracter'],
        maxlength:[20,'first name must be contain 3 chracter']
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'first name must be contain 3 chracter'],
        maxlength:[10,'first name must be contain 3 chracter']
    },
    email: {
        type: String,
        trim: true,
        required:true,
        lowercase:true,
        unique:true,
        validate: {
            validator(v){
                return v.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            }
        }
    
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:30,
        validate:{
            validator(v){
                const passArray = ['password','123456','god123']
                const isMatch = passArray.some(pass => v.includes(pass))
                if(isMatch){
                    return false
                }
            }
        }
    }
})


userSchema.pre('save',async function(next){
    //console.log(this)
    if(this.isModified('password')){
        const hashPassword =  await bcrypt.hash(this.password,12)
       this.password = hashPassword
 next()
    }else{
        next()
    }
 
})

const userModel = new mongoose.model('User',userSchema)

module.exports = userModel