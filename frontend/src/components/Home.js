import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const url='http://localhost:4000/posts'

const Welcome = () => {
    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-4">Welcome to MERN-CRUD</h1>
                <hr className="my-4" />
                <p className="lead">This is a simple MERN-CRUD-application, done with Mongo, Express, React and Node.</p>
            </div>
        </div>
    )
}

const ViewAllPosts = ({posts}) => {
    return (
        <div>
            {posts.map((post) => <article className="jumbotron" key={post.id}>
                <h1>{post.title}</h1>                
                <p>{post.post}</p>

                <Link className="btn btn-primary" 
                    to={`/viewsinglepost/${post.id}`}                        
                >View post </Link>
    
                </article>)}
  
        </div>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios
            .get(url)
            .then(response => {
                this.setState({posts: response.data})
            })
    }

    render() { 
        return (
            <div>
                <div className="container">
                    <br />
                    <header>
                        <Welcome />
                    </header>
                    <section>
                        <ViewAllPosts posts={this.state.posts} />
                    </section>
                </div>
            </div>
        )
    }
  }

  export default Home