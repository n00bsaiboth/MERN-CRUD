import React from 'react'
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'


const url='http://localhost:4000/posts/'

const RemoveSinglePost = ({post}) => {
  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron">
          <h1>Are you sure you are about to remove the current post</h1>
          <hr />
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Post: {post.post}</p>
        </div>
      </div>
    </div>
  )
}


class RemovePost extends React.Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)

      this.state = {
        post: [],
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

    
    handleSubmit(event) {
      const post = {
        id: this.state.id
      }      


      axios
        .delete(url + this.state.post_id, post)
        .then(response => {
            this.setState({
              post: [],
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
        return <Redirect to='/' />
      } else {
        return (
          <div>
            <RemoveSinglePost post={this.state.post} />
  
            <div className="container">
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>                   
                      <input className="btn btn-primary" type="submit" value="Remove post" />
                  </form>
              </div>
            </div>
          </div>
        )       
      }
    }
  }
  
  export default withRouter(RemovePost)
