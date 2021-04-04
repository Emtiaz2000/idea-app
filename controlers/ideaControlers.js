const mongoose = require('mongoose')
const Idea = require('../models/ideas')
const _ = require('lodash')
function docx(id, title, description, status, allowComment,tags) {
    return {
        id,
        title,
        description,
        status,
        allowComment,
        tags
    }
}

const getIdeaControlers = async (req, res,nest) => {
    
    const ideas = await Idea.find()
    const context = {
        ideasDocument: ideas.map(idea => docx(idea._id, idea.title, idea.description, idea.status, idea.allowComment,idea.tags))
    }
    res.render('ideas/index', {
        ideas: context.ideasDocument,
        title: "All idea"
    })


}
const getAddIdeaControler = (req, res) => {
    res.render('ideas/new', {
        title: 'add Idea page'
    })
}

const postIdeaControler = async (req, res,next) => {
    console.log(req.body)
    req.body.tags = req.body.tags.split(',')
    const allowComment = req.body.allowComment ? true : false
    const idea = new Idea({
        ...req.body,
        allowComment

    })
    await idea.save()

    res.redirect('/ideas')
/* } catch (error) {
    //console.log(error)
    for (field in error.errors) {
        console.log(error.errors[field].path)
        console.log(error.errors[field].message)
    }
    // res.send('404 page not found')
    next(error)
} */

}

const getSingleIdeaControler =  async (req, res,next) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.send('invalid Id')
    }else{
         const idea = await Idea.findById(id)
            const ideaDocument = docx(idea._id, idea.title, idea.description, idea.status, idea.allowComment,idea.tags)
            if (idea) {
                res.render("ideas/idea", {
                    idea: ideaDocument,
                    title: ideaDocument.title
                })
            } else {
                res.render('pages/notfound')
            }
        }

    //console.log(idea)

}

const getEditControler = async (req, res,next) => {
    
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.send('invalid id')
    }else{
        const idea = await Idea.findById(id)
        const ideaDocument = docx(idea._id, idea.title, idea.description, idea.status, idea.allowComment,idea.tags)
        if (idea) {
            res.render('ideas/edit', {
                title: "Edit idea",
                idea: ideaDocument
            })
        } else {
            
            res.render('pages/notfound')
        }
    }

}

const UpdateControler = async (req, res, next) => {
    const id = req.params.id
    req.body.allowComment = req.allowComment;
    req.body.tags = req.body.tags.split(',')
    const pickedValue = _.pick(req.body, ["title", "description", "allowComment", "status","tags"])
    //console.log(pickedValue)

    const idea = await Idea.findByIdAndUpdate(id, pickedValue, {
        useFindAndModify: false
    })
    if (idea) {
        res.redirect(`/ideas/${id}`)
    } else {

        res.render('pages/notfound')
    }



}

const deletIdeaControler =  async (req, res, next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send('Invalid id')
    } else {

        const idea = await Idea.findByIdAndDelete(id)
        if (idea) {
            res.redirect('/ideas')
        } else {

            res.render('pages/notfound')

        }

    }


}

const aboutControler =   (req, res) => {
    res.render('pages/contact', {
        title: "contact page",
        text: "welcome from contact page"
    })
}
const homeControler =   (req, res) => {
    res.render('pages/home', {
        title: "home page",
        text: "welcome from home page"
    })
}

const NotfountControler = (req, res) => {
    res.render('pages/notfound')
}

module.exports = {
    getIdeaControlers,
    getAddIdeaControler,
    postIdeaControler,
    getSingleIdeaControler,
    getEditControler,
    UpdateControler,
    deletIdeaControler,
    aboutControler,
    homeControler,
    NotfountControler
}