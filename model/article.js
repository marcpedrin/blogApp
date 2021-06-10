const mongoose = require('mongoose')

//database schema is structure of data which is going to be stored in DB

const articleSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: false
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

//"Article" is a model which is going to use this schema

module.exports = mongoose.model('Article', articleSchema)