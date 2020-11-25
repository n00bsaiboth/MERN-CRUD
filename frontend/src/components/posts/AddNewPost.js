import React from 'react'
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

const url='http://localhost:4000/posts'

class AddNewPost extends React.Component {
    constructor(props) {
        super(props)

        this.handleChangeToTitle = this.handleChangeToTitle.bind(this)
        this.handleChangeToPost = this.handleChangeToPost.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            posts: [],
            title: '',
            post: '',
            redirect: false
        }
    }

    componentDidMount() {
        axios
            .get(url)
            .then(response => {
                this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChangeToTitle(event) {
        this.setState({title: event.target.value})
    } 

    handleChangeToPost(event) {
        this.setState({post: event.target.value})
    } 

    handleSubmit(event) {
        const post = {
            title: this.state.title,
            post: this.state.post
        }

        axios
            .post(url, post)
            .then(response => {
                this.setState({
                    title: '',
                    post: '',
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
                    <div className="container">
                        <br />

                        <div className="jumbotron">
                            <h1>You are about to send a new post.</h1>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChangeToTitle}/>
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="post">Post:</label>
                                    <input type="text" className="form-control" id="post" value={this.state.post} onChange={this.handleChangeToPost} />
                                </div>
                                
                                <input className="btn btn-primary" type="submit" value="Submit new post" />
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
  }

  export default AddNewPost