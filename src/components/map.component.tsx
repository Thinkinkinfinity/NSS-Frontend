import React, { useEffect, useRef, useState } from "react";
import { GeoJSON, MapContainer, ScaleControl } from "react-leaflet";
import * as topojson from "topojson-client";
import india from "./india.json";
import { getColor, layersUtils, getCenterOfGeoJson } from "./mapUtils";
import "leaflet/dist/leaflet.css";
import { Feature, FeatureCollection } from "geojson";
import { Map as LeafletMap, Layer } from "leaflet";
import { Topology } from "topojson-specification";
import { GeoJSON as LeafletGeoJSON } from "leaflet";
import { LatLngTuple } from "leaflet";
import './map.component.scss';

interface IndiaJson {
  type: string;
  transform: object;
  objects: any;
  arcs: any;
}

const COUNTRY_VIEW_ID = "Tamil Nadu";

export default function ChoroplethMapDrillDown() {
  const [geoJsonId, setGeoJsonId] = useState<string>(COUNTRY_VIEW_ID);

  //   const geoJson: Feature | FeatureCollection = topojson.feature((india as IndiaJson), (india as IndiaJson).objects[geoJsonId]);
  const geoJson: Feature | FeatureCollection = topojson.feature(
    (india as unknown) as Topology,
    (india as IndiaJson).objects[geoJsonId]
  );

  const mapRef = useRef<LeafletMap | null>(null);
  //   const geoJsonRef = useRef<GeoJSON | null>(null);
  //   const geoJsonRef = useRef<GeoJSON.FeatureCollection | null>(null);
  // const geoJsonRef = useRef<GeoJSON.GeoJsonObject | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);

  const onDrillDown = (e: any) => {
    const featureId = e.target.feature.id;
    console.log(e.target.feature.properties.district)
    alert(e.target.feature.properties.district)
    // if (!(india as IndiaJson).objects[featureId]) {
    //   return;
    // }
    // setGeoJsonId(featureId);
  };

  useEffect(() => {
    if (mapRef.current && geoJsonRef.current) {
      mapRef.current.fitBounds((geoJsonRef.current as any).getBounds());
    }
  }, [geoJsonId]);

  const mapCenter = getCenterOfGeoJson(geoJson);

  return (
    <div className="mapMainContainer">
      <MapContainer
        className="map"
        center={mapCenter as L.LatLngTuple}
        zoom={7.2}
        ref={mapRef}
        style={{ height: "700px", width: "100%", backgroundColor: "transparent" }}
      >
        <GeoJSON
          data={geoJson}
          key={geoJsonId}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
          ref={geoJsonRef}
        />
        <ScaleControl />
      </MapContainer>
    </div>
  );

  function resetHighlight(e: L.LeafletMouseEvent) {
    if (geoJsonRef.current) {
      geoJsonRef.current.resetStyle(e.target);
    }
  }
  
  function onEachFeature(_: any, layer: Layer) {
    let layerUtils = layersUtils(geoJsonRef, mapRef);
    layer.on({
      mouseover: layerUtils.highlightOnClick,
      mouseout: resetHighlight,
      click: onDrillDown,
    });
    layer.bindTooltip(`
        <div class="custom-tooltip">
            <div class="title"> <strong> ${_.properties.district} </strong> </div>
            <div><strong>Number of Institutions:</strong> 10</div>
            <div><strong>Number of Po’S:</strong> 20</div>
            <div><strong>Number of Units:</strong> 20</div>
            <div><strong>Number of Students:</strong> 200</div>
        </div>`,
    {
        className: "my-custom-tooltip",
        permanent: false,
    }
    );
  }
  function getBlueColor(value: number) {
    // set the saturation and lightness based on the value
    let lightness = (1 - (value / 26)) * 50;  // adjust the denominator based on your data range
    return `hsl(210, 100%, ${lightness}%)`;
}
  function geoJSONStyle(feature: any) {
    return {
      color: "#ffffff",
      weight: 1,
      fillOpacity: 0.5,
      fillColor: getColor(Math.floor(Math.random() * 26)),
    };
  }
}
