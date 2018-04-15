import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink, HashRouter } from "react-router-dom";
import data from '../../../data/mock/przystanki.json';

class StreetBusstops extends Component {
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
    updatedList = updatedList.filter(function(street){
      return street.street.toLowerCase().search(
        searchValue.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  componentWillMount(){
    this.setState({items: data.data});
  }
  componentDidMount(){
    this.setState({initialItems : data.data});
  }
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Ulice - lista</Panel.Heading>  
          <Panel.Body>
            <form>
              <FormGroup controlId="searchForm">
                <ControlLabel>Linia</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="<<tu podaj nazwe ulicy>>"
                  onChange={this.changeHandler}
                />              
              </FormGroup>
            </form>
            <ListGroup>
              {
                this.state.items.map(
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