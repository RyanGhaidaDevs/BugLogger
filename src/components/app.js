import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import LogsContainer from './LogsContainer';
import NavBar from './NavBar';
import BugLog from './AddBugLog/BugLog';
import { Redirect } from 'react-router';
import BugShowPage from './AddBugLog/BugShowPage';
import ProjectsContainer from './ProjectsContainer';
import AllLogs from './AllLogs';
import Registration from './auth/Registration';
import Login from './auth/Login'; 

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      editLog: {},
      projectSelected: false 
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.setProjects = this.setProjects.bind(this);
    //cant post projects or logs 
    this.setSelectedProject = this.setSelectedProject.bind(this);
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  checkLoginStatus(){
    axios.get("https://bugloggerapi.herokuapp.com/logged_in", {withCredentials: true}).then(response => {
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    }).catch(error => {
      console.log("login error:", error)
    })
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      projectSelected: false,
      user: {}
    })
    axios.delete("https://bugloggerapi.herokuapp.com/logout", {withCredentials: true}).catch(error => {
      console.log("logout error", error)
    })
  }

  setSelectedProject(project){
    this.setState({
      projectSelected: project
    })
  }

  handleEdit = (log, props) => {
    this.setState({editLog: log}, () => props.history.push("/editLog"))
  }

  

  render() {
    return (
      <div>
      <BrowserRouter>
        <Switch>
        <Redirect from="/" exact to="/alllogs" />
        <Route 
            path={"/registration"} 
            render={ props => (
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <Registration {...props} handleLogin={this.handleLogin} /> 
              </div> 
            )}
          /> 
          <Route 
            path={"/login"} 
            render={ props => (
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <Login {...props} handleLogin={this.handleLogin} /> 
              </div> 
            )}
          /> 
        <Route 
            path={"/homepage"} 
            render={ props => (
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <ProjectsContainer {...props} setSelectedProject={this.setSelectedProject}  loggedInStatus={this.state.loggedInStatus} user={this.state.user} selectedProject={this.state.projectSelected}/> 
              </div> 
            )}
          /> 
          <Route 
            exact 
            path={"/projectlogs"} 
            render={ props => (
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <LogsContainer {...props} projectSelected={this.state.projectSelected} handleEdit={this.handleEdit} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/> 
              </div> 
            )}
          />

           <Route  
            exact 
            path={"/alllogs"} 
            render={ props => (
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <AllLogs {...props}  projectSelected={this.state.projectSelected} handleEdit={this.handleEdit} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/> 
              </div> 
            )}
          /> 
          <Route 
            exact 
            path={"/addLog"} 
            render={ props =>(
              <div> 
                <NavBar {...props}  projectSelected={this.state.projectSelected} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <BugLog {...props} projectSelected={this.state.projectSelected} user={this.state.user}/>
              </div>
            )}
          />
          <Route 
            exact 
            path={"/editLog"} 
            render={ props => (
              <div> 
                <NavBar {...props}  handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} user={this.state.user} /> 
                <BugShowPage {...props} loggedInStatus={this.state.loggedInStatus} log={this.state.editLog} user={this.state.user}/> 
              </div> 
            )}
          /> 
        </Switch>
      </BrowserRouter> 
      </div>
    );
  }
}

