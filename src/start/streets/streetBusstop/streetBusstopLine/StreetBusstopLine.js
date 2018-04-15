import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../../data/mock/getBusStopRouteList.json';
 
class StreetBusstopLine extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var constNameMatch = this.props.match.params.busstopid;
    var fd =  data.GetBusStopRouteList.filter(function(record) { return record.busstopid == constNameMatch; });
    this.setState({ filteredData : fd[0] });
  }
  /*componentDidMount() {
    var constNameMatch = this.props.match.params.busstopid;
    var fd =  data.GetBusStopRouteList.filter(function(record) { return record.busstopid == constNameMatch; });
    this.setState({ filteredData : fd[0] });
  }*/
  render() {
    
    return (
      <Jumbotron>
      <Panel>
        <Panel.Heading>Przystanek autobusowy {this.state.filteredData.data.name} - linie</Panel.Heading>  
        <Panel.Body>
        <ListGroup>
          {
            this.state.filteredData.data.metadata.busroutes.map(function(busroute){
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