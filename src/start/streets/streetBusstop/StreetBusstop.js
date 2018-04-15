import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import StreetBusstopLines from './streetBusstopLines/StreetBusstopLines';
import StreetBusstopLine from './streetBusstopLine/StreetBusstopLine';
 
class StreetBusstop extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.constNameMatch = this.props.match.params.street;
  }
  componentWillMount() {
    this.constNameMatch = this.props.match.params.street;
  }

  render() {
    return (
      <Switch>
        <Route exact path={'/streets/' + this.constNameMatch} component={()=><StreetBusstopLines streetName={ this.constNameMatch }/>} />
        <Route path={'/streets/' + this.constNameMatch + '/:busstopid'} component={StreetBusstopLine}/>
      </Switch>
    );
  }
}
 
export default StreetBusstop;