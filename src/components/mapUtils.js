import center from "@turf/center";
import L from "leaflet";

export function getColor(d) {
  return d > 25
    ? "#3354F4"
    : d > 20
    ? "#74ABFF"
    : d > 15
    ? "#3FB8F7"
    : d > 10
    ? "#AAE2FF"
    : d > 5
    ? "#3354F4"
    : "#3354F4";
}

export function getCenterOfGeoJson(geoJson) {
  return center(geoJson).geometry.coordinates.reverse();
}

export function layersUtils(geoJsonRef, mapRef) {
  function highlightOnClick(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: "#f90303",
      dashArray: "",
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    geoJsonRef.current.leafletElement.resetStyle(e.target);
  }

  function zoomToFeature(e) {
    mapRef.current.leafletElement.fitBounds(e.target.getBounds());
  }

  return { highlightOnClick, resetHighlight, zoomToFeature };
}
