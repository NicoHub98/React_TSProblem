import React, { useState } from "react";
// import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";

const MContainer = ({ position, data, marker, polyLine }) => {
  const [color, setColor] = useState({ color: "red" });

  // let num = 2;
  // const addLine = () => {
  //   let auxLine = polyLine;
  //   auxLine[0].push([-27.4860751 + num, -58.8747887 + num]);
  //   setPolyLine(auxLine);
  //   console.log(polyLine);
  //   num++;
  // };

  return (
    <div>
      <button onClick={() => setColor({ color: "black" })}>Color</button>

      <MapContainer
        center={position}
        zoom={4}
        scrollWheelZoom={false}
        style={{ width: 100 + "%", height: 100 + "vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline pathOptions={color} positions={polyLine} />

        <Marker position={marker}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MContainer;
