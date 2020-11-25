import React from 'react'
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'


const url='http://localhost:4000/posts/'

const UpdateSinglePost = ({post}) => {
  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron">
          <h1>Are you sure you are about to update the current post</h1>
          <hr />
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Post: {post.post}</p>
        </div>
      </div>
    </div>
  )
}


class UpdatePost extends React.Component {
    constructor(props) {
      super(props)

      this.handleChangeToTitle = this.handleChangeToTitle.bind(this)
      this.handleChangeToPost = this.handleChangeToPost.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

      this.state = {
        post: [],
        newTitle: '',
        newPost: '',
        post_id: this.props.match.params.id,
        redirect: false
      }
    }

    componentDidMount() {
      axios
          .get(url + this.state.post_id)
          .then(response => {
              this.setState({post: response.data})
          })
          .catch(error => {
            console.log(error)
          })
    }

    handleChangeToTitle(event) {
      this.setState({newTitle: event.target.value})
    } 

    handleChangeToPost(event) {
      this.setState({newPost: event.target.value})
    }
    
    handleSubmit(event) {
      const post = {
          title: this.state.newTitle,
          post: this.state.newPost
      }

      axios
      .put(url + this.state.post_id, post)
      .then(response => {
          this.setState({
              newTitle: '',
              newPost: '',
              redirect: true   
          })  
        })  
      .catch(error => {
        console.log(error)
      })
      
      event.preventDefault()
  }


    render() {
      if (this.state.redirect) {
        return <Redirect to={`/viewsinglepost/${this.state.post_id}`} />
      } else {
        return (
          <div>
            <UpdateSinglePost post={this.state.post} />
  
            <div className="container">
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label htmlFor="title">Title:</label>
                              <input type="text" className="form-control" id="title" name="title" value={this.state.newTitle} onChange={this.handleChangeToTitle}/>
                        </div>
  
                          <div className="form-group">
                              <label htmlFor="post">Post:</label>
                              <input type="text" className="form-control" id="post" name="post" value={this.state.newPost} onChange={this.handleChangeToPost} />
                          </div>
                                
                          <input className="btn btn-primary" type="submit" value="Update post" />
                  </form>
              </div>
            </div>
          </div>
        )
      }

    }
  }
  
  export default withRouter(UpdatePost)
