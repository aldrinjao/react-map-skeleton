import React from "react";

const Legend = ({ stops, styling, name, legend }) => {

  const renderLegendKeys = (stop, i) => {
    return (
      <div key={i} className="txt-m">
        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: stop[1] }}
        />
        <span>{`${stop[0].toLocaleString()}`}</span>

      </div>
    );
  };

  return (
    <>
      <div className="bg-white py6 px12 shadow-darken10 round z1">
        
        {legend.map(renderLegendKeys)}
      </div>
    </>
  );
};

export default Legend;
