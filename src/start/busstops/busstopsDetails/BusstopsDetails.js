import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../data/mock/linieSzczegoly_out_flat.json';

class BusstopsDetails extends Component {
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Przystanki autobusowe</Panel.Heading>  
          <Panel.Body>
          <ListGroup>
            {
              data.busstops.map(
                function(busstop){
                  return <ListGroupItem><Link to={ "/busstops/" + busstop.BusStopId }>{busstop.BusStopName}</Link></ListGroupItem>;
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
 
export default BusstopsDetails;