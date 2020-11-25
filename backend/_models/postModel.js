const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
  title: {
    type: String
  },
  post: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports=Post