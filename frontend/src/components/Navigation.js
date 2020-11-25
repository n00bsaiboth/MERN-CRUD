import React from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends React.Component {

    render() {
        return (
          <nav className="navbar navbar-expand-md navbar-static-top bg-dark navbar-dark" id="top">
          <div className="container">
            <NavLink className="navbar-brand" to="/">MERN-CRUD</NavLink>
  
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addnew">Add new post</NavLink>
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
        )
    }
}

export default Navigation