import React, { Component } from "react";
import { Jumbotron, Panel } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <Jumbotron>
        <Panel>
          <Panel.Heading>Witaj</Panel.Heading>  
          <Panel.Body>Prosta aplikacja od rozkładów jazdy autobusów MPK w Rzeszowie</Panel.Body>
        </Panel>
      </Jumbotron>
    );
  }
}
 
export default Home;