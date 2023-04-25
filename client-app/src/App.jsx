import axios from "axios";
import './styles/App.css';
import { Component } from "react";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Quotes from './components/Quotes.jsx';
import MyQuotes from './components/MyQuotes.jsx';

const client = axios.create({
  baseURL: "."
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

  }

  handleChange = (e) => {
    console.log(e.target.value);


    this.setState({
      text: `${e.target.value}`
    });
  }

  handleSubmit = (e) => {
    console.log("it works 2");
    // Prevent the default submit and page reload
    e.preventDefault();

    const texte = {
      texte: this.state.text
    };


    client
      .post(`http://localhost:3001/api/testCreate/`, { texte })
      .then(response => {
        console.log(response);
        // Handle response
      })
  }

  render() {
    return (
      <div className="container">
        <Quotes />

        <Divider style={{width:'100%', borderBottomWidth: 2, marginBlock:"40px"}}/>

        <MyQuotes/>
      </div >

    )
  }

}

export default App;