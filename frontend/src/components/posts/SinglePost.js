import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'


const url='http://localhost:4000/posts/'

const ViewSinglePost = ({post}) => {
  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron">
          <h1>Information about the current post</h1>
          <hr />
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Post: {post.post}</p>

          <Link className="btn btn-primary" 
                    to={`/updatepost/${post.id}`}                        
          >Update post </Link>

        <Link className="btn btn-primary" 
                    to={`/removepost/${post.id}`}                        
          >Remove post </Link>
        </div>
      </div>
    </div>
  )
}


class SinglePost extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        post: [],
        post_id: this.props.match.params.id
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

    render() {
      return (
        <div>
          <ViewSinglePost post={this.state.post} />
        </div>
      )
    }
  }
  
  export default withRouter(SinglePost)
