import React, { Component } from "react";

import "./ProwlFinder.css";

import locations from "./locations.json";
import cat from "./assets/img/cat-icon.png";

class ProwlFinder extends Component {
  componentDidMount() {
    const map = new window.google.maps.Map(
      this.refs.googleMap,
      {
        center: {
          lat: 29.424122,
          lng: -98.493629
        }
      }
    );

    const bounds = new window.google.maps.LatLngBounds();

    locations.forEach((location) => {
      let marker = new window.google.maps.Marker(
        {
          position: {
            lat: location.lat,
            lng: location.lng
          },
          map: map
        }
      );

      bounds.extend(marker.position);
    });

    map.fitBounds(bounds);
  }

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          Hi
        </div>
        <div className="header">
          <img src={cat} className="brand-logo" /> <span>ProwlFinder</span>
        </div>
        <div ref="googleMap" className="google-map"></div>
      </React.Fragment>
    );
  }
}

export default ProwlFinder;
