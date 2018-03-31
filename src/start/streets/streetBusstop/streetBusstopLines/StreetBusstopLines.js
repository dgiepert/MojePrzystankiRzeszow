import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../../data/mock/przystanki.json';

class StreetBusstopLines extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var constNameMatch = this.props.streetName;
    var filteredDatas = data.data.filter(function(record) { return record.street === constNameMatch; });
    var filteredData = filteredDatas[0];
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Przystanki autobusowe - lista</Panel.Heading>  
          <Panel.Body>
          <ListGroup>
            {
              filteredData.busstops.map(function(line){
              return <ListGroupItem><NavLink to={ "/streets/" + constNameMatch + "/"+line.busstopid }>{line.busstopname}</NavLink></ListGroupItem>;
              })
            }
          </ListGroup>
          </Panel.Body>
        </Panel>
      </Jumbotron>
    );
  }
}
 
export default StreetBusstopLines;