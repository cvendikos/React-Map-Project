import React, { Component } from "react";
import debounce from "lodash/debounce";

import "./ProwlFinder.css";

import allLocations from "./locations.json";
import cat from "./assets/img/cat-icon.png";

class ProwlFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
      locations: allLocations
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.filterLocations = this.filterLocations.bind(this);
  }

  renderMap() {
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

    this.state.locations.forEach((location) => {
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
    this.renderMap();
  }

  toggleSidebar() {
    this.setState({
      showSidebar: this.state.showSidebar ? false : true
    });
  }

  filterLocations(event) {
    if (event.target.value === "") {
      return this.setState({
        locations: allLocations
      }, debounce(this.renderMap, 1000));
    }

    const newLocations = allLocations.filter((l) => {
      let searchRegex = new RegExp(event.target.value, "gi");

      if (searchRegex.test(l.name) || searchRegex.test(l.features)) {
        return true;
      }

      return false;
    });

    this.setState({
      locations: newLocations
    }, debounce(this.renderMap, 1000));
  }

  render() {
    return (
      <React.Fragment>
        { this.state.showSidebar ?
          <div className="sidebar">
            <i onClick={this.toggleSidebar} className="fa fa-remove close-sidebar"></i>

            <input onChange={this.filterLocations} type="text" className="search-input" placeholder="Filter results..." />

            <ul className="sidebar-list">
              { this.state.locations.map((location, index) => {
                return (
                  <li key={index}>
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
          <img onClick={this.toggleSidebar} src={cat} className="brand-logo" alt="Logo" /> <span>ProwlFinder</span>
        </div>
        <div ref="googleMap" className="google-map"></div>
      </React.Fragment>
    );
  }
}

export default ProwlFinder;
