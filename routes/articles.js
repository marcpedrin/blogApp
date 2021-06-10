const express = require('express')

const Article = require('../model/article.js')

const app = express.Router()


//route for index.ejs 

// route for new.ejs to create new article

app.get('/new', (req,res)=> {
  res.render('articles/new', {article: new Article()})
});

//route for edit.ejs to edit an exisiting article using id

app.get ('/edit/:id', async (req,res)=>{
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', {article: article})
})

app.get ('/:id', async (req,res)=>{
  const article = await Article.findById(req.params.id)
  if (article==null) res.redirect('/')
  res.render('articles/show', {article: article})
})

// routes for saving the article

app.post ('/',  (req,res,next)=>{
req.article = new Article()
next()
}, saveArticleAndRedirect('new'))


app.put ('/:id', async (req,res,next)=>{
  req.article = await Article.findById(req.params.id)
  next()
  }, saveArticleAndRedirect('edit'))

app.delete ('/:id', async (req,res)=>{
  req.article = await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect (path){

  return async (req,res)=>{
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();

      res.redirect(`/articles/${article.id}`)
    }

    catch (err) {

      res.render(`articles/${path}`, {article: article})


    }
  }

}



module.exports = app