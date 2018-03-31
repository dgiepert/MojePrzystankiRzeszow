import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import BusstopsDatails from './busstopsDetails/BusstopsDetails';
import BusstopDatails from './busstopDetails/BusstopDetails';

class Busstops extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/busstops' component={BusstopsDatails}/>
        <Route path='/busstops/:busstopId' component={BusstopDatails}/>
      </Switch>
    );
  }
}
 
export default Busstops;