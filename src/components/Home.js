import React, { Component } from 'react';
import axios from 'axios';
import Registration from './auth/Registration';
import Login from './auth/Login';


export default class Home extends Component  {
  constructor(props) {
    super(props)

    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccesfulAuth(data) {
    this.props.handleLogin(data)
    this.props.history.push("/dashboard")
  }

  handleLogoutClick(){
   
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <h1> Home Page </h1>
        <h3> Welcome {this.props.user.email} !</h3> 
        
        <Registration handleSuccesfulAuth={this.handleSuccesfulAuth}/>
        <Login handleSuccesfulAuth={this.handleSuccesfulAuth}/>
      </div>
    )
  }
}


 