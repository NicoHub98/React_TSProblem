import React, { useState } from "react";
import Lines from "../../scripts/Lines.json";
import MContainer from "./MContainer";
import Distancias from "../../scripts/distancias.json";

const Map = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [marker, setMarker] = useState(null);
  const [markers, setMarkers] = useState(null);
  let lat = -40.458027;
  let lng = -65.9029903;
  let position = [lat, lng];
  const [list, setList] = useState(null);
  const [num, setNum] = useState(1);
  const [first, setFirst] = useState(0);
  const [polyLine, setPolyLine] = useState([[[-34.6154304, -58.5981102]]]);

  const handleLine = () => {
    // setMarker([-31.3994532, -64.1942124]);
    let aux = [list.filter((item, key) => key <= num && [item.lat, item.lng])];
    // let auxMarker = [markers.filter((item, key) => key <= num && item)];
    let auxMarker = markers;
    auxMarker = auxMarker.slice(0, num + 1);
    // console.log(aux);
    setPolyLine(aux);
    setNum(num + 1);
    setMarker(auxMarker);
    // console.log(aux);
    // console.log(auxMarker);
    // console.log(num);
  };

  const calcDistance = (first, Distancias) => {
    setIsDisabled(false);
    setList(null);
    setNum(1);
    setPolyLine([]);
    let provinces = Distancias;
    let firstProv = provinces[first];
    let x = [firstProv.lat, firstProv.lng];
    setMarker([x]);
    let listParcial = [firstProv];
    let totalDist = 0;
    let parcial = 0;
    let next = 0;
    let min = 999999;
    firstProv.visited = true;

    for (let i = 0; i < 23; i++) {
      min = 999999;

      for (let j = 0; j <= 23; j++) {
        if (!provinces[j].visited) {
          if (firstProv.distances[j] < min && firstProv.distances[j] > 0) {
            next = j;
            min = firstProv.distances[j];
          }
        }
      }

      listParcial.push(provinces[next]);
      totalDist += firstProv.distances[next];
      provinces[next].visited = true;
      firstProv = provinces[next];
      // distParcial
    }
    setList(listParcial);
    let aux = [];
    for (let i = 0; i < Distancias.length; i++) {
      Distancias[i].visited = false;
      aux.push([listParcial[i].lat, listParcial[i].lng]);
    }

    setMarkers(aux);
  };
  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col">
            <div className="border border-primary">
              <MContainer
                position={position}
                data={list}
                marker={marker}
                polyLine={polyLine}
              />
            </div>
          </div>
          <div className="col g-5">
            <div className="row m-2">
              <label className="form-label" htmlFor="selectProv">
                Seleccionar provincia de inicio
              </label>
              <select
                className="form-select"
                onChange={(e) => setFirst(e.target.value)}
                id="selectProv"
              >
                {Distancias.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row m-2">
              <button
                className="btn btn-primary"
                onClick={() => calcDistance(first, Distancias)}
              >
                Calc Distance
              </button>
            </div>
            <div className="row m-2">
              <button
                className="btn btn-secondary"
                onClick={handleLine}
                disabled={isDisabled}
              >
                New line
              </button>
            </div>
          </div>
        </div>

        {/* <button onClick={addLine}>New Line that WORKS!</button> */}
      </div>
    </>
  );
};

export default Map;
