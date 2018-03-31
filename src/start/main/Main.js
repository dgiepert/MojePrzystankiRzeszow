import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from ".././home/Home";
import Buslines from ".././buslines/Buslines";
import Busstops from ".././busstops/Busstops";
import Streets from ".././streets/Streets";
import Navigate from ".././navigate/Navigate";

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/routes" component={Buslines}/>
            <Route path="/busstops" component={Busstops}/>
            <Route path="/streets" component={Streets}/>
            <Route path="/navigate/:busstopId" component={Navigate}/>
        </Switch>
      );
    }
  }

export default Main

