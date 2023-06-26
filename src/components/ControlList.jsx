import React, { useEffect, useRef } from "react";
import { useState } from "react";

const ControlList = ({ newList, distParcial }) => {
  const [sumParcial, setSumParcial] = useState([0]);
  const endScrollRef = useRef(null);
  const scrollToBottom = () => {
    endScrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [newList]);

  useEffect(() => {
    if (distParcial === 0) {
      setSumParcial([distParcial]);
    } else {
      setSumParcial([...sumParcial, distParcial]);
    }
  }, [distParcial]);

  return (
    <>
      <div
        className=""
        style={{
          border: 1 + "px solid black",
          borderRadius: 15 + "px",
          borderRight: "none",
          height: 300 + "px",
          overflowY: "scroll",
          scrollMarginBlockEnd: 1 + "px",
        }}
      >
        <table className="table tableClass">
          <thead>
            <tr>
              <th className="tableClass" style={{ position: "sticky", top: 0 }}>
                {" "}
              </th>
              <th className="tableClass" style={{ position: "sticky", top: 0 }}>
                Ciudad
              </th>
              <th className="tableClass" style={{ position: "sticky", top: 0 }}>
                Dist. Parcial
              </th>
            </tr>
          </thead>
          <tbody className="tableClass">
            {newList &&
              newList.map(({ name }, index) => (
                <tr key={index}>
                  <td className="tableClass">{index + 1}</td>
                  <td className="tableClass">{name}</td>
                  <td className="tableClass">{sumParcial[index]}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div ref={endScrollRef} />
      </div>
    </>
  );
};

export default ControlList;
