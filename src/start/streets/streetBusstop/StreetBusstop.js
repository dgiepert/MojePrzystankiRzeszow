import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import StreetBusstopLines from './streetBusstopLines/StreetBusstopLines';
import StreetBusstopLine from './streetBusstopLine/StreetBusstopLine';
 
class StreetBusstop extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var constNameMatch = this.props.match.params.street;
    return (
      <Switch>
        <Route exact path={'/streets/' + constNameMatch} component={()=><StreetBusstopLines streetName={constNameMatch}/>} />
        <Route path={'/streets/' + constNameMatch + '/:busstopid'} component={StreetBusstopLine}/>
      </Switch>
    );
  }
}
 
export default StreetBusstop;