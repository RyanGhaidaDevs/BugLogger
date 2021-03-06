import React, { Component } from 'react';
import axios from 'axios';
import LogCard from './AddBugLog/LogCard';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  Search: {
    background: 'white',
    border: 5,
    borderRadius: 5,
    boxShadow: '0 3px 20px 2px rgb(192,192,192)',
    width: 800,
    margin: 20,
  },
};

class LogsContainer extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      logs: false,
      editLog: false,
      filteredLogs: [],
      search: ""

    }

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    axios.get("https://bugloggerapi.herokuapp.com/logs", { withCredentials: true }).then( data => {
      const projectLogs = data.data.logs.filter(log => log.project_id === this.props.projectSelected.id)
      this.setState({
        logs: projectLogs
      })
    })
  }

     
  displayLogs(){
    const logs = this.state.logs;
    console.log(logs)
    const editLog = this.state.editLog;
    const props = this.props;
    if(logs){
      return logs.sort(function(a, b) { 
        return a.id - b.id
      }).map(log => {
        return <Grid item sm> <LogCard {...props} handleLikes={this.handleLikes} user={log.user_email} key={log.id} class="not edit" handleEdit={this.props.handleEdit} handleDelete={this.handleDelete} log={log} /> </Grid> 
      })
    }
  }

    displayFilteredLogs(){
      let filteredLogs = this.state.filteredLogs;
      let props = this.props;
      if(filteredLogs){
        return filteredLogs.sort(function(a, b) { 
          return a.id - b.id
        }).map(log => {
          return <Grid item sm> 
            <LogCard {...props} handleLikes={this.handleLikes} user={this.props.user.email} key={log.id} class="not edit" handleEdit={this.props.handleEdit} handleDelete={this.handleDelete} log={log} /> 
          </Grid> 
        })
      }
    }

    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value
      }, () => {
        const logs = this.state.logs
        let filteredLogs = logs.filter(log => Object.values(log).join(" ").toString().toLowerCase().split(" ").includes(this.state.search.toLowerCase())) 
         this.setState({
           filteredLogs: filteredLogs
         })
      })  
    }



  handleDelete = (id) => {
    axios.delete(`https://bugloggerapi.herokuapp.com/logs`, {data: {user: {id: id}}}, { withCredentials: true }).then( data => {
      const projectLogs = data.data.logs.filter(log => log.project_id === this.props.projectSelected.id)
      debugger
      this.setState({
        logs: projectLogs
      })
    })
  }


  render(){
  
    const { classes } = this.props;

    return(
      <div class='searchParent'>
        <div class='searchChild'> 
        <TextField
          className={classes.Search}
          placeholder="Search"
          name="search"
          inputProps={{ style: {textAlign: 'center'} }}
          onChange={this.handleChange}     
        />
        </div> 
        <Grid container>
          {this.state.search !== "" ? this.displayFilteredLogs() : this.displayLogs()}
        </Grid> 
      </div>
    )
  }
}

export default withStyles(styles)(LogsContainer);


 