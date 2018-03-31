import React, { Component } from "react";
import { Jumbotron, Panel, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import data from '../../../data/mock/linieSzczegoly_out_flat.json';
import data1 from '../../../data/mock/getBusStopRouteList.json';
import axios from 'axios';
import geodesy from 'geodesy';
 
class BusstopDetails extends Component {
  constructor(props) {
    super(props);
    this.constNameMatch = this.props.match.params.busstopId;
    this.mapElement = null;
    var that = this;
    this.record = data.busstops.filter(function(record) { return record.BusStopId == that.constNameMatch; })[0];
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.StartPoint = {
      Lat : parseFloat(this.record.BusStopLong.replace(',', '.')),
      Long : parseFloat(this.record.BusStopLat.replace(',', '.'))
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {

    /*let axiosConfig = {
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
    };*/
    //https://github.com/chrisveness/geodesy/blob/master/latlon-spherical.js

    var that = this;
    var x = data1.GetBusStopRouteList.filter(function(record) { return record.busstopid == that.constNameMatch; })[0];
    //alert(x.data.id);
    /*axios.get(`http://einfo.erzeszow.pl/Home/GetBusStopTimeTable?busStopId=${this.props.match.params.busstopId}&routeId=${x.data.metadata.busroutes[0].routeId}&ttId=0)`)//, axiosConfig)
      .then(res => {
        alert(res.data);
      });*/
        //alert(res.data);
        //const data = res.data.data.children.map(obj => obj.data);
        this.setState({ src : 'http://einfo.erzeszow.pl/Home/TimeTableReal?busStopId=' + this.props.match.params.busstopId });
        this.setState({ height: 300 });
        this.setState({ width: 300 });
        this.setState({ show: true });
      //});
  }
  componentDidMount() {
    var mapElement = this.mapElement;
    const google = window.google;
    this.map = new google.maps.Map(mapElement, {
      zoom: 16,
      center: {
        lat: this.StartPoint.Lat,
        lng: this.StartPoint.Long
      }
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: this.StartPoint.Lat,
        lng: this.StartPoint.Long
      }
    });
  
    this.geocoder = new google.maps.Geocoder();
  }
  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }
  render() {
    //var constNameMatch = this.props.match.params.busstopId;
    //var filteredData = data.busstops.filter(function(record) { return record.BusStopId == constNameMatch; });
    return (
      <Jumbotron>
        <Panel>
          <Panel.Heading>Przystanek {this.record.BusStopName}</Panel.Heading>  
          <Panel.Body>
          <div>Kod przystanku : {this.record.BusStopNum}</div>
          <div className="map" ref={this.setMapElementReference}></div>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Pokaż tablice
          </Button>
          <Button bsStyle="success" bsSize="large" href={ "/navigate/" + this.constNameMatch }>Nawiguj z obecnej lokalizacji</Button>
          </Panel.Body>
        </Panel>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custom-modal">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <iframe id="modalContentBusTimeTable" src={this.state.src}/>
          </Modal.Body>
        </Modal>
      </Jumbotron>
    );
  }
}
 
export default BusstopDetails;