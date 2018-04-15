import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import data from '../../../data/mock/linie.json';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
 
class BuslinesDetails extends Component {
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
    ), "");//.replace(/\)/g, "");
    updatedList = updatedList.filter(function(line){
      return line.value.toLowerCase().search(
        searchValue.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  componentWillMount(){
    this.setState({items: data.routes});
  }
  componentDidMount(){
    this.setState({initialItems : data.routes});
  }
  /*getInitialState(){
    return {
      initialItems : data.routes,
      items : data.routes
    }
  }*/
  render() {
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Linie autobusowe</Panel.Heading>  
          <Panel.Body>
          <form>
            <FormGroup controlId="searchForm">
              <ControlLabel>Linia</ControlLabel>
              <FormControl
                type="text"
                placeholder="<<tu podaj numer linii>>"
                onChange={this.changeHandler}
              />              
            </FormGroup>
          </form>
          <ListGroup>
            {
              this.state.items.map(
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