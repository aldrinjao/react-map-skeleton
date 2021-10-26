import React from "react";

const Optionsfield = ({basemaps, activeBaseMap, changeBaseMap}) => {

  const renderOptions = (basemap, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => changeBaseMap(i)}
          checked={basemap.name === activeBaseMap.name}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {basemap.name}
        </div>
      </label>
    );
  };
  return (
    <div className="toggle-group absolute top right mr60 mt12 border border--2 border--white bg-white shadow-darken10 z1">
      {basemaps.map(renderOptions)}
      
    </div>
  );
};

export default Optionsfield;
