import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../data/mock/linieSzczegoly_out.json';
import data1 from '../../../data/mock/linie.json';
 
class BuslineDetails extends Component {
  constructor(props) {
    super(props);
    //state = { items : data.routes };
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(event){ 
    var updatedList = this.state.initialItems;
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    var searchValue = event.target.value.replace(/\\/g, "\\\\").replace(new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    ), "");    
    updatedList = updatedList.filter(function(lineBusstop){
      return lineBusstop.BusStopName.toLowerCase().search(searchValue.toLowerCase()) !== -1;
    });
    this.setState({ filteredData : updatedList});
  }
  componentWillMount(){
    var routeId = this.props.match.params.routesId;
    this.setState({constNameMatch : this.props.match.params.routesId});
    var fd = data.routesData.filter(function(record) { return record.Id == routeId; });
    var fd1 = data1.routes.filter(function(record) { return record.routeid == routeId; });
    this.setState({items: fd[0].Data });
    this.setState({filteredData : fd[0].Data });
    this.setState({filteredData1 : fd1 });
  }
  componentDidMount(){
    var routeId = this.props.match.params.routesId;
    var fd = data.routesData.filter(function(record) { return record.Id == routeId; });
    this.setState({items: fd[0].Data });
    this.setState({initialItems : fd[0].Data });
  }
  /*getInitialState(){
    var routeId = this.props.match.params.routesId;
    var fd = data.routesData.filter(function(record) { return record.Id == routeId; });
    return {
      initialItems : fd[0].Data,
      items : fd[0].Data
    }
  }*/
  render() {

    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Linia autobusowa {this.state.filteredData1[0].value}</Panel.Heading>  
          <Panel.Body>
          <form>
            <FormGroup controlId="searchForm">
              <ControlLabel>Przystanek</ControlLabel>
              <FormControl
                type="text"
                placeholder="<<tu podaj przystanek>>"
                onChange={this.changeHandler}
              />              
            </FormGroup>
          </form>
          <ListGroup>
            {
              this.state.filteredData.map(
                function(lineBusstop){
                  return <ListGroupItem><Link to={ "/busstops/" + lineBusstop.BusStopId }>przystanek {lineBusstop.BusStopName}</Link></ListGroupItem>;
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