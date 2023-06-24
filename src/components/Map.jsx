import React, { useState } from "react";
import MContainer from "./MContainer";
import Distancias from "../scripts/distancias.json";
import Control from "./Control";

const Map = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [marker, setMarker] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [distList, setDistList] = useState([]);
  const [distParcial, setDistParcial] = useState(null);
  const [distTotal, setDistTotal] = useState(null);
  const [distActual, setDistActual] = useState(null);
  const [list, setList] = useState(null);
  const [num, setNum] = useState(1);
  const [first, setFirst] = useState(0);
  const [polyLine, setPolyLine] = useState([[[-34.6154304, -58.5981102]]]);
  let lat = -40.458027;
  let lng = -65.9029903;
  let position = [lat, lng];

  const handleLine = () => {
    if (num < 24) {
      let aux = [
        list.filter((item, key) => key <= num && [item.lat, item.lng]),
      ];
      let auxMarker = markers;

      let auxParcial = 0;
      for (let i = 0; i < num; i++) {
        auxParcial += distList[i];
      }

      auxMarker = auxMarker.slice(0, num + 1);
      setPolyLine(aux);
      setNum(num + 1);
      setMarker(auxMarker);
      setDistActual(distList[num - 1]);
      setDistParcial(auxParcial);
      if (num === 23) setIsDisabled(true);
    } else {
      setIsDisabled(true);
    }
  };

  const calcDistance = (first, Distancias) => {
    setIsDisabled(false);
    setDistParcial(0);
    setDistActual(0);
    setList(null);
    setNum(1);
    setPolyLine([]);
    let distancesTotal = [];
    let provinces = Distancias;
    let firstProv = provinces[first];
    let x = [firstProv.lat, firstProv.lng];
    setMarker([x]);
    let listParcial = [firstProv];
    let totalDist = 0;
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
      distancesTotal.push(firstProv.distances[next]);
      firstProv = provinces[next];
    }
    setList(listParcial);
    let aux = [];
    for (let i = 0; i < Distancias.length; i++) {
      Distancias[i].visited = false;
      aux.push([listParcial[i].lat, listParcial[i].lng]);
    }
    setDistTotal(totalDist);
    setMarkers(aux);
    setDistList(distancesTotal);
  };
  return (
    <>
      <div className="container pt-3">
        <div className="row mb-2">
          <div className="row">
            <h1>Problema del Viajero</h1>
            <p>
              Dada una ciudad de partida, se buscará la ruta más óptima para
              recorrer todo el país teniendo en cuenta la cuidad más cercana a
              la ubicación actual.
            </p>
          </div>
          <div className="col-md">
            <div className="border border-primary">
              <MContainer
                position={position}
                data={list}
                marker={marker}
                polyLine={polyLine}
              />
            </div>
          </div>
          <div className="col-md">
            <Control
              Distancias={Distancias}
              calcDistance={calcDistance}
              first={first}
              setFirst={setFirst}
              handleLine={handleLine}
              isDisabled={isDisabled}
              distTotal={distTotal}
              distParcial={distParcial}
              data={list}
              distActual={distActual}
              num={num}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
