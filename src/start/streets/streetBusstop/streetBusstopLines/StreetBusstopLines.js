import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../../data/mock/przystanki.json';

class StreetBusstopLines extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var streetName = this.props.streetName;
    this.setState({ constNameMatch : streetName });
    var fd = data.data.filter(function(record) { return record.street === streetName; });
    this.setState({ filteredDatas : fd });
    this.setState({ filteredData : fd[0] });
  }
  componentDidMount() {
    //var streetName = this.props.streetName;
    //this.setState({ constNameMatch : streetName });
    //var fd = data.data.filter(function(record) { return record.street === streetName; });
    //this.setState({ filteredDatas : fd });
    //this.setState({ filteredData : fd[0] });
  }
  render() {
    var streetName = this.state.constNameMatch;    
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Przystanki autobusowe przy ulicy { streetName } </Panel.Heading>  
          <Panel.Body>
          <ListGroup>
            {
              this.state.filteredData.busstops.map(function(line){
              return <ListGroupItem><NavLink to={ "/streets/" + streetName + "/"+ line.busstopid }>{line.busstopname}</NavLink></ListGroupItem>;
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