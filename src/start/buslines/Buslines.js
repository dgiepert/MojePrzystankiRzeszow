import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import BuslinesDetails from './buslinesDatails/BuslinesDetails';
import BuslineDetails from './buslineDetails/BuslineDetails';

class Buslines extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/routes' component={BuslinesDetails}/>
        <Route path='/routes/:routesId' component={BuslineDetails}/>
      </Switch>
    );
  }
}
 
export default Buslines;