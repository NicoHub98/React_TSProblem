import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ControlList from "./ControlList";

const Control = ({
  Distancias,
  calcDistance,
  first,
  setFirst,
  handleLine,
  isDisabled,
  distTotal,
  distParcial,
  distActual,
  data,
  num,
}) => {
  const [newList, setNewList] = useState();
  useEffect(() => {
    if (data) {
      setNewList(data.slice(0, num));
    }
  }, [distTotal, num]);
  return (
    <>
      <div className="row m-1">
        <div className="form-floating">
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
          <label className="mx-2" htmlFor="selectProv">
            {" "}
            Seleccionar provincia de inicio
          </label>
        </div>
      </div>
      <div className="row m-2">
        <button
          className="btn btn-primary"
          onClick={() => calcDistance(first, Distancias)}
        >
          Calcular Distancia
        </button>
      </div>
      <div className="row m-2">
        <button
          className="btn btn-secondary"
          onClick={handleLine}
          disabled={isDisabled}
        >
          Siguiente paso
        </button>
      </div>
      <div className="row">
        {distTotal && (
          <>
            <p>Distancia total: {distTotal} km</p>
            <p>Distancia parcial: {distParcial} km</p>
            <p>Distancia actual: {distActual} km</p>
          </>
        )}
        {newList && <ControlList newList={newList} distParcial={distParcial} />}
      </div>
    </>
  );
};

export default Control;
