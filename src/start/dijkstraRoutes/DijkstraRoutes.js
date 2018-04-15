import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../data/mock/linieSzczegoly_out_flat.json';
import graph from '../../data/mock/linieSzczegoly_out_flat_graph.json';
 
class DijkstraRoutes extends Component {
  componentDidMount() {
    this.startBustops = [];
    var that = this;
  }
  lowestCostNode(costs, processed){
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  }
  dijkstra(graphData, lowestCostNode){

    // track lowest cost to reach each node
    const costs = Object.assign({finish: Infinity}, graphData.start);
  
    // track paths
    const parents = {finish: null};
    for (let child in graphData.start) {
      parents[child] = 'start';
    }
  
    // track nodes that have already been processed
    const processed = [];
  
    let node = lowestCostNode(costs, processed);
  
    while (node) {
      let cost = costs[node];
      let children = graphData[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
    }
  
    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();
  
    const results = {
      distance: costs.finish,
      path: optimalPath
    };
  
    return results;
  }
  render() {
    var constNameMatch = this.props.match.params.routesId;
    var filteredData = data.routesData.filter(function(record) { return record.Id == constNameMatch; });
    var filteredData1 = data1.routes.filter(function(record) { return record.routeid == constNameMatch; });
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Wyszukaj trasę między przystankami</Panel.Heading>  
          <Panel.Body>
                <Form vertical>
                <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}>
                <ControlLabel>todo:</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.todoValue}
                    placeholder="new todo item name"
                    onChange={this.changeHandler}/>
                <FormControl.Feedback />
                </FormGroup>
                <Button type="button" onClick={this.showMessage}>Zapisz</Button>
            </Form>
          </Panel.Body>
        </Panel>
      </Jumbotron>
    );
  }
}
 
export default DijkstraRoutes;