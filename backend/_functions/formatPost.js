const formatPost = (post) => {
    return {
      title: post.title,
      post: post.post,
      date: post.date,
      id: post._id
    }
  }

  module.exports=formatPost