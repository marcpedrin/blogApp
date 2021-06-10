// importing packages

const express = require('express')
const mongoose = require('mongoose')
const Article = require('./model/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

// using packages

const app = express()

const PORT = 2021


//mongoDB connection

const connection = () => {
  mongoose.connect('mongodb+srv://marc:Mnap1012@articlecluster.ktw5y.mongodb.net/blogapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('connected to DB')
}

connection()

// view engine

app.set('view engine', 'ejs')

// this allows us to use url, to collect Form data form the link 

app.use(express.urlencoded({
  extended: false
}))

// this allows us to override a method in form tag[GET/POST/PUT/DELETE]

app.use(methodOverride('_method'))

//routes 
app.get('/', async (req,res)=> {
  const articles = await Article.find()
  res.render('articles/index', {articles: articles})
});
app.use('/articles', articleRouter)

//port 

app.listen(PORT, ()=>{
  console.log(`http://localhost:${PORT}`)
}) 

