import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../data/mock/linieSzczegoly_out.json';
import data1 from '../../../data/mock/linie.json';
 
class BuslineDetails extends Component {
  render() {
    var constNameMatch = this.props.match.params.routesId;
    var filteredData = data.routesData.filter(function(record) { return record.Id == constNameMatch; });
    var filteredData1 = data1.routes.filter(function(record) { return record.routeid == constNameMatch; });
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Linia autobusowa {filteredData1[0].value}</Panel.Heading>  
          <Panel.Body>
          <ListGroup>
            {
              filteredData[0].Data.map(
                function(lineBusstop){
                  return <ListGroupItem><Link to={ "/busstops/" /*+ constNameMatch + "/" */+ lineBusstop.BusStopId }>przystanek {lineBusstop.BusStopName}</Link></ListGroupItem>;
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
 
export default BuslineDetails;