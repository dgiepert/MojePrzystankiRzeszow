import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from "./header/Header";
import Main from "./main/Main";

class Start extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <BrowserRouter>
          <div>
            <Header />
            <Main />
          </div>
        </BrowserRouter>
      );
    }
  }
  
  export default Start; 