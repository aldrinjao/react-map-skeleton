import React, { useRef, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RoomIcon from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';

const FilterPanel = ({ displayFPanel,
  setdisplayFPanel,
  points,
  setPoints,
  categories,
  setCategories,
  incidentDate,
  setincidentDate }) => {


  const [value, setValue] = React.useState([2010, 2021]);

  const handleChange = (event, newValue) => {

    setValue(newValue);
    const filterDate = [{
      'start': newValue[0]
    }, {
      'end': newValue[1]
    }];

    setincidentDate(filterDate);

  };


  function toggle() {
    setdisplayFPanel(false);
  }

  const handleCheck = (event) => {
    event.stopPropagation();
    const tempCat = [...categories];

    categories.forEach(element => {

      const temp = Object.keys(element)[0];
      if (temp === event.target.name) {
        element[temp] = event.target.checked;
      }
    });

    setCategories(tempCat);

  };

  return (
    <div>
      <div className="panelTitleRow">
        <span className="panelTitle">
          Incidents
        </span>
        <span className="panelIcon">
          <IconButton onClick={toggle}>
            <ChevronLeftIcon ></ChevronLeftIcon>
          </IconButton>

        </span>
      </div>
      <span>Years: {value[0]}-{value[1]}</span>
      <Box sx={{ width: 190 }} className="filterBox">
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2010}
          max={2021}
          marks
        />
      </Box>


      Cause
      <div className="txt-m">
        <Checkbox
          color="primary"
          id='shadow'
          name='shadow'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />


        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#727272" }}
        />
        <span>Shadow economy</span>

      </div>

      <div className="txt-m">
        <Checkbox
          color="primary"
          id='resource'
          name='resource'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />



        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#01a812" }}
        />
        <span>Resource issue</span>

      </div>
      <div className="txt-m">
        <Checkbox
          color="primary"
          id='political'
          name='political'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />


        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#f82d00" }}
        />
        <span>Political issue</span>

      </div>
      <div className="txt-m">
        <Checkbox
          color="primary"
          id='identity'
          name='identity'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />


        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#ffa32b" }}
        />
        <span>Identity issue</span>

      </div>


      <div className="txt-m">
        <Checkbox
          color="primary"
          id='governance'
          name='governance'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />


        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#8d00bc" }}
        />
        <span>Governance issue</span>

      </div>

      <div className="txt-m">
        <Checkbox
          color="primary"
          id='common'
          name='common'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />

        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#00a1d6" }}
        />
        <span>Common crime</span>

      </div>
      <div className="txt-m">
        <Checkbox
          color="primary"
          id='other'
          name='other'
          onClick={handleCheck}
          title="toggle layer"
          style={{
            padding: " 0 5px",
            transform: "scale(0.8)",
          }} />


        <span
          className="mr12 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: "#ffffff", border: "1px solid black" }}
        />
        <span>Other issue</span>

      </div>

    </div>
  );
}


export default FilterPanel;