const mongoose = require('mongoose')
const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[ true,"title is required"],
        minlength:[2 ,"title must be gatter than 4 chracter"],
        maxlength:[50,"title must be smaller than 4 chracter"],
        trim:true,
        unique:[true,"title must be unique"]
        //lowerCase:true
        // set(v){
        //     return v.toLowerCase()
        // },
        // get(v){
        //     return v.toUpperCase()
        // }

    },
    description: {
        type: String,
        maxlength:10000,
        /* validate:{
            validator(v){
                return v.toLowerCase().includes('description')
            },
            message:"Description word is required"
        } */
    },
    allowComment: {
        type: Boolean,
        required: [ true,"comment is required"],
        default:false

    },
    status: {
        type: String,
        required: [ true,"status is required"],
        //enum:['public','private']
        enum:{
            values:['public','private'],
            message:"please provide publice and private in status field"
        }
    },
    tags:{
        type:[String],
        required:true,
        trim:true,
        validation:{
            validator(v){
                return v[0]>0
            },
            message:"Idea must have one tag"
        }
    }
})

const Idea = new mongoose.model('Idea', ideaSchema)

module.exports = Idea;