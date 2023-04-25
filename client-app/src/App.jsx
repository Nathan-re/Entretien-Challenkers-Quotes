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