import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../../data/mock/getBusStopRouteList.json';
 
class StreetBusstopLine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var constNameMatch = this.props.match.params.busstopid;
    var filteredData = data.GetBusStopRouteList.filter(function(record) { return record.busstopid == constNameMatch; });
    return (
      <Jumbotron>
      <Panel>
        <Panel.Heading>Przystanek autobusowy {filteredData[0].data.name} - linie</Panel.Heading>  
        <Panel.Body>
        <ListGroup>
          {
            filteredData[0].data.metadata.busroutes.map(function(busroute){
            //return <ListGroupItem><NavLink to={ "/streets/" + constNameMatch + "/"+busroute.routeId }>{"linia " + busroute.routeName}</NavLink></ListGroupItem>;
            return <ListGroupItem><NavLink to={ "/routes/" + busroute.routeId }>{"linia " + busroute.routeName}</NavLink></ListGroupItem>;
            })
          }
        </ListGroup>
        </Panel.Body>
      </Panel>
    </Jumbotron>
    );
  }
}
 
export default StreetBusstopLine;