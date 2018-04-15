import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../data/mock/linieSzczegoly_out_flat.json';

class BusstopsDetails extends Component {
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
    updatedList = updatedList.filter(function(line){
      return line.BusStopName.toLowerCase().search(
        searchValue.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  componentWillMount(){
    this.setState({items: data.busstops});
  }
  componentDidMount(){
    this.setState({initialItems : data.busstops});
  }
  getInitialState(){
    return {
      initialItems : data.busstops,
      items : data.busstops
    }
  }
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Przystanki autobusowe</Panel.Heading>  
          <Panel.Body>
          <form>
            <FormGroup controlId="searchForm">
              <ControlLabel>Linia</ControlLabel>
              <FormControl
                type="text"
                placeholder="<<tu podaj nazwę przystanku>>"
                onChange={this.changeHandler}
              />              
            </FormGroup>
          </form>
          <ListGroup>
            {
              this.state.items.map(
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