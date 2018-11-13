import React, { Component } from "react";

import "./ProwlFinder.css";

import locations from "./locations.json";
import cat from "./assets/img/cat-icon.png";

class ProwlFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: true,
      locations: locations
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  renderMap(mapLocations) {
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

  componentDidMount() {
    this.renderMap(this.state.locations);
  }

  toggleSidebar() {
    this.setState({
      showSidebar: this.state.showSidebar ? false : true
    });
  }

  render() {
    return (
      <React.Fragment>
        { this.state.showSidebar ?
          <div className="sidebar">
            <i onClick={this.toggleSidebar} className="fa fa-remove close-sidebar"></i>

            <ul className="sidebar-list">
              { this.state.locations.map((location) => {
                return (
                  <li>
                    <div className="text-bold">
                      {location.name}
                    </div>
                    <div>
                      {location.features}
                    </div>
                  </li>
                );
              }) }
            </ul>
          </div>
        : null }

        <div className="header">
          <img onClick={this.toggleSidebar} src={cat} className="brand-logo" /> <span>ProwlFinder</span>
        </div>
        <div ref="googleMap" className="google-map"></div>
      </React.Fragment>
    );
  }
}

export default ProwlFinder;
