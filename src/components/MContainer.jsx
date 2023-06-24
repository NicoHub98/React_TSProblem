import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";

const MContainer = ({ position, data, marker, polyLine }) => {
  return (
    <div>
      <MapContainer
        center={position}
        zoom={4}
        scrollWheelZoom={false}
        style={{ width: 100 + "%", height: 95 + "vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline pathOptions={{ color: "black" }} positions={polyLine} />

        {marker &&
          marker.map((pos, i) => (
            <Marker key={i} position={pos}>
              <Popup>{data[i].name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MContainer;
