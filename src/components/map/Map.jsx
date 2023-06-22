import React, { useState } from "react";
import Lines from "../../scripts/Lines.json";
import MContainer from "./MContainer";
import Distancias from "../../scripts/distancias.json";

const Map = () => {
  const [line, setLine] = useState(Lines);
  const [marker, setMarker] = useState([-34.6154304, -58.5981102]);
  let lat = -40.458027;
  let lng = -65.9029903;
  let position = [lat, lng];
  const [num, setNum] = useState(1);

  const [polyLine, setPolyLine] = useState([
    [
      [-34.6154304, -58.5981102],
      [-31.3994532, -64.1942124],
    ],
  ]);
  const handleLine = () => {
    // setMarker([-31.3994532, -64.1942124]);
    // let aux = [
    //   [-34.6154304, -58.5981102],
    //   [-31.3994532, -64.1942124],
    //   [-27.4860751, -58.8747887],
    // ];
    let aux = [
      // Distancias.map(({ id, lat, lng }) => {
      //   if (id <= 10) {
      //     return [lat, lng];
      //   } else {
      //     return null;
      //   }
      // }),
      Distancias.filter((item) => item.id <= num && [item.lat, item.lng]),
    ];
    console.log(aux);
    setPolyLine(aux);
    setNum(num + 1);
    console.log(num);
  };

  const [isMap, setIsMap] = useState(true);

  return (
    <>
      <div>
        {isMap ? (
          <MContainer
            position={position}
            data={"line"}
            marker={marker}
            polyLine={polyLine}
          />
        ) : (
          <p>No map</p>
        )}
        {/* <button onClick={addLine}>New Line that WORKS!</button> */}

        <button onClick={handleLine}>New line</button>
        <button onClick={() => setIsMap(!isMap)}>Map</button>
      </div>
    </>
  );
};

export default Map;
