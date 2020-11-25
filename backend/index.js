const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/* mongoose and mongodb connection
 *
 */

const url = process.env.MONGODB_URI

mongoose.Promise = global.Promise

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

/* models for mongoose and mongodb
 *
 */

const Post = require('./_models/postModel') 

/* setup for bodyparser and cors
 *
 */ 

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

/* helper functions
 *
 */

const formatPost = require('./_functions/formatPost')

/* setup for logger
 *
 */


const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(logger)

/* Setup for the app for use static build
 *
 */

// app.use(express.static('build'))

/* Routes
 *
 */

app.get('/', function (req, res) {
  res.send(`Your post server is running on port ${PORT}.`)
})

app.get('/posts', (req, res) => {
    Post
        .find({})
        .then(posts => {
            res.json(posts.map(formatPost))
        })
        .catch(error => {
            res.status(400).send({error: 'Something went wrong.'})
        })
})

app.get('/posts/:id', (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            if(post) {
                res.json(formatPost(post))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            res.status(400).send({error: 'Malformatted Id.'})
        })
})

app.post('/posts', (req, res) => {
    const body = req.body

    const post = new Post({
        title: body.title,
        post: body.post
    })

    post
        .save()
        .then(savedPost => {
            res.json(formatPost(savedPost))
        })
        .catch(error => {
            res.status(400).send({error: 'Something went wrong.'})
        })
})

app.put('/posts/:id', (req, res) => {
    
    const body = req.body

    const post = {
        title: body.title,
        post: body.post
    }

    Post
        .findByIdAndUpdate(req.params.id, post, {new: true})
        .then(updatedPost => {
            res.json(formatPost(updatedPost))
        })
        .catch(error => {
            res.status(400).send({error: 'Malformatted Id.'})
        })
})

app.delete('/posts/:id', (req, res) => {
    Post
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({ error: 'Malformatted id.' })
        })
})

/* setup for error handling
 *
 */

const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(error)

app.listen(PORT, () => {
   console.log(`Your post server is running on port ${PORT}.`)
})

