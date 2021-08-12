import React from "react";

const Legend = (props) => {
  const renderLegendKeys = (stop, i) => {
    return (
      <div key={i} className="txt-s">
        <span
          className="mr6 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: stop[1] }}
        />
        <span>{`${stop[0].toLocaleString()}`}</span>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white py12 px12 shadow-darken10 round z1">
        <div className="mb6">
        </div>
        {props.stops.map(renderLegendKeys)}
      </div>
    </>
  );
};

export default Legend;