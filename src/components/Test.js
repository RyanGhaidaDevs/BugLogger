import React, { Component } from 'react';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';


class Test extends Component {

  constructor(props){
    super(props);

    this.state = {
    name: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }


  handleChange = (event) =>  {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(this.state))
  }


  handleSubmit= (event)=> {
    event.preventDefault();

    const {
      name
    } = this.state 

    axios.post("http://localhost:3001/projects",{
      user: {
        name: name,
      }
    }, 
    { withCredentials: true }
    ).then( response => {
      console.log("posting project response", response)
      this.props.history.push("homePage");
     // add error handling here
    }).catch( err => {
      console.log("posting project error", err)
    });
  };



  render() {
    return (
      <MuiThemeProvider >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
        <Grid item xs={3}>
        </Grid>   
        <TextField 
          placeholder="Project Name"
          label="Project Name"
          name="name"
          onChange={this.handleChange}         
          inputProps={{
            style: {fontSize: 28, padding: 40, width: 500}
          }}
          />

          <Button 
          label="submit"
          primary={"true"}
          margin='15'
          onClick={this.handleSubmit}
          inputProps={{
            style: {fontSize: 28} 
          }}> 
            Create Project 
          </Button>
          </Grid>
          </MuiThemeProvider>
    )
  }
}

export default Test
