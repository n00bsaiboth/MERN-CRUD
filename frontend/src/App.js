import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Navigation from './components/Navigation'

import SinglePost from './components/posts/SinglePost'

import AddNewPost from './components/posts/AddNewPost'
import UpdatePost from './components/posts/UpdatePost'
import RemovePost from './components/posts/RemovePost'

function App() {
  return (
    <BrowserRouter>
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    
                    <Route path='/viewsinglepost/:id' component={SinglePost} />
                    <Route path='/updatepost/:id' component={UpdatePost} /> 
                    <Route path='/removepost/:id' component={RemovePost} />

                    <Route path='/addnew' component={AddNewPost} /> 
                    
                    <Route component={Error} />
                </Switch>    
            </div>
    </BrowserRouter>
  )
}

export default App
