import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import StreetBusstops from './streetBusstops/StreetBusstops';
import StreetBusstop from './streetBusstop/StreetBusstop';

class Streets extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/streets' component={StreetBusstops}/>
        <Route path='/streets/:street' component={StreetBusstop}/>
      </Switch>
    );
  }
}
 
export default Streets;