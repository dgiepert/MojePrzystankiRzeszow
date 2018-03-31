import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink, HashRouter } from "react-router-dom";
import data from '../../../data/mock/przystanki.json';

class StreetBusstops extends Component {
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Ulice - lista</Panel.Heading>  
          <Panel.Body>
            <ListGroup>
              {
                data.data.map(
                  /*p =>
                  <ListGroupItem><Link to={`/streets/${p.street}`}>{p.street}</Link></ListGroupItem>*/
                  function(streetData, index){
                    return <ListGroupItem><Link to={ "/streets/" + streetData.street }>{index} - {streetData.street}</Link></ListGroupItem>;
                  }
                )
              }
            </ListGroup>
          </Panel.Body>
        </Panel>
      </Jumbotron>
    );
  }
}
 
export default StreetBusstops;