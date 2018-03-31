import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import data from '../../../data/mock/linie.json';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
 
class BuslinesDetails extends Component {
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Linie autobusowe</Panel.Heading>  
          <Panel.Body>
          <ListGroup>
            {
              data.routes.map(
                function(line){
                  return <ListGroupItem><Link to={ "/routes/" + line.routeid }>linia {line.value}</Link></ListGroupItem>;
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
 
export default BuslinesDetails;