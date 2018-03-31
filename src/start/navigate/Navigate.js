import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Jumbotron, Panel, ListGroup } from 'react-bootstrap';
import {LatLonEllipsoidal} from 'geodesy';
import data from '../../data/mock/linieSzczegoly_out_flat.json';

class Navigate extends Component {
    constructor(props) {
        super(props);
        this.constNameMatch = this.props.match.params.busstopId;
        var that = this;
        this.mapElement = null;
        this.record = data.busstops.filter(function(record) { return record.BusStopId == that.constNameMatch; })[0];

        this.filterList = this.filterList.bind(this);
        this.setMapElementReference = this.setMapElementReference.bind(this);

        this.StartPoint = new LatLonEllipsoidal(
            parseFloat(this.record.BusStopLong.replace(',', '.')),
            parseFloat(this.record.BusStopLat.replace(',', '.'))
        );
        this.MapStartPoint = {
            Lat : parseFloat(this.record.BusStopLong.replace(',', '.')),
            Long : parseFloat(this.record.BusStopLat.replace(',', '.'))
          }
        this.BusStopPoints = data.busstops.filter(function(record) { return record.BusStopId != that.constNameMatch; }).map(function(record){
            var p = new LatLonEllipsoidal(parseFloat(record.BusStopLong.replace(',', '.')), parseFloat(record.BusStopLat.replace(',', '.')));
            var x = { id : record.BusStopId, name : record.BusStopName,  point : p, distanceToStart : that.StartPoint.distanceTo(p) };
            return x;
        });
        this.geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        this.nearesBusstopsMarkest = new Array();
        this.nearesBusstopsMarkersInfos = new Array();
        this.setState({currentDistance : 0 });
    }
    filterList(e){
        var updatedList = this.BusStopPoints;
        updatedList = updatedList.filter(function(record){
          return record.distanceToStart <= e.target.value;
        });
        this.setState({items: updatedList});
        this.setState({currentDistance : e.target.value});
    }
    componentWillMount(){
        this.setState({items: this.BusStopPoints});
    }
    drawCircle(thisObject, coords, cRadius){
        const google = window.google;
        thisObject.locationCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: thisObject.map,
            center: {lat: coords.latitude, lng: coords.longitude},
            radius: parseFloat(cRadius)
          });
    }
    drawNearesMarkers(thisObject, coords, cRadius){
        const google = window.google;
        var currentLocation = new LatLonEllipsoidal(coords.latitude, coords.longitude);
        var nearesBusstops = thisObject.BusStopPoints.map(function(record){
            var distanceToCurrentLocation = currentLocation.distanceTo(record.point);
                var x = { id : record.id, name : record.name,  point : record.point, distanceToStart : distanceToCurrentLocation };
                return x;
        }).filter(function(record) { return record.distanceToStart <= cRadius; });
        
        thisObject.nearesBusstopsMarkest.forEach(function(marker){
            marker.setMap(null);
        });
        thisObject.nearesBusstopsMarkersInfos.length = 0;
        thisObject.nearesBusstopsMarkest.length = 0;
        nearesBusstops.forEach(function(item){

            var infowindow = new google.maps.InfoWindow({
                content: '<a href="/navigate/' + item.id + '" class="btn btn-lg btn-info">Nawiguj do ' + item.name +'</a>'
            });
              
            var marker = new google.maps.Marker({
                position: {lat: item.point.lat, lng: item.point.lon},
                map: thisObject.map,
                title: item.name
            });
            marker.addListener('click', function() {
                infowindow.open(thisObject.map, marker);
            });

            thisObject.nearesBusstopsMarkest.push(marker);
            thisObject.nearesBusstopsMarkersInfos.push(infowindow);
        });
    }
    clearDrawings(thisObject){
        if(thisObject.locationCircle){
            thisObject.locationCircle.setMap(null);
        }
        thisObject.locationCircle = null;
    }
    
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    componentDidMount() {
        
        var mapElement = this.mapElement;
        const google = window.google;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.map = new google.maps.Map(mapElement, {
          zoom: 10,
          center: {
            lat: this.MapStartPoint.Lat,
            lng: this.MapStartPoint.Long
          }
        });
        this.marker = new google.maps.Marker({
          map: this.map,
          position: {
            lat: this.MapStartPoint.Lat,
            lng: this.MapStartPoint.Long
          }
        });
        this.directionsDisplay.setMap(this.map);
      
        this.geocoder = new google.maps.Geocoder();
        var that = this;
        navigator.geolocation.getCurrentPosition(function(pos) {
            var crd = pos.coords;
            that.clearDrawings(that);
            that.drawCircle(that, crd, that.state.currentDistance);
            that.drawNearesMarkers(that, crd, that.state.currentDistance);
            that.calcRoute(that, crd, that.MapStartPoint,'WALKING');
        },this.error,this.geolocationOptions);

        this.watchID = navigator.geolocation.watchPosition(function(pos) {
            var crd = pos.coords;
            that.clearDrawings(that);
            that.drawCircle(that, crd, that.state.currentDistance);
            that.drawNearesMarkers(that,crd,that.state.currentDistance);
            that.calcRoute(that, crd,that.MapStartPoint,'WALKING');
        });
      }
      componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
      }
      setMapElementReference(mapElementReference) {
        this.mapElement = mapElementReference;
      }
      calcRoute(thisObject, startCoords, endCoords, travelMode) {
        var google = window.google;
        var currentZoom = thisObject.map.getZoom();
        var currentCenter = thisObject.map.getCenter();
        thisObject.directionsDisplay.setMap(null);
        thisObject.directionsDisplay.setPanel(null);  
        thisObject.directionsDisplay = new google.maps.DirectionsRenderer();
        thisObject.directionsDisplay.setMap(thisObject.map); 
        
        
        var request = {
          origin: new google.maps.LatLng(startCoords.latitude, startCoords.longitude) ,
          destination: new google.maps.LatLng(endCoords.Lat, endCoords.Long) ,
          travelMode: travelMode
        };
        /*
        'DRIVING' (Default)
        'BICYCLING'
        'TRANSIT'
        'WALKING'
        */
       thisObject.directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            thisObject.marker.setMap(null);
            thisObject.directionsDisplay.setDirections(result);
          }
          else{
            thisObject.marker.setMap(thisObject.map); 
          }
          thisObject.map.setZoom(currentZoom);
          thisObject.map.setCenter(currentCenter);
        });
      }
    render() {
      return (
        <Jumbotron>
            <Panel>
                <Panel.Heading>{this.record.BusStopName + '(' + this.record.BusStopId + ')'}</Panel.Heading>  
                <Panel.Body>
                <div className="map" ref={this.setMapElementReference}></div>
                <input type="text" placeholder="odległość od punktu[m]" onChange={this.filterList}/>
                <ListGroup>
                    {
                    /*this.state.items.map(
                        function(busstopp){
                            return <div>{ busstopp.name + "(" + busstopp.id + ') - odległość : ' + busstopp.distanceToStart + '[m]' }</div>;
                        }
                    )*/
                    }
                </ListGroup>
                
                </Panel.Body>
            </Panel>
        </Jumbotron>
      );
    }
  }

export default Navigate
