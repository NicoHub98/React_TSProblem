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
  loader,
  setLoader,
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
        <div>
          <label className="mx-2 labelSelect" htmlFor="selectProv">
            {" "}
            Seleccionar provincia de inicio
          </label>
          <select
            className="form-select select"
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
      </div>
      <div className="row m-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            setLoader(true);
            setTimeout(() => {
              calcDistance(first, Distancias);
            }, 500);
          }}
        >
          {loader ? (
            <>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Cargando...
            </>
          ) : (
            "Calcular Distancia"
          )}
        </button>
      </div>
      <div className="row m-2">
        <button
          className="btn btn-success"
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
