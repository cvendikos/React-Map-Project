import React, { Component } from "react";

import "./ProwlFinder.css";

import locations from "./locations.json";

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
      <div ref="googleMap" className="google-map"></div>
    );
  }
}

export default ProwlFinder;
