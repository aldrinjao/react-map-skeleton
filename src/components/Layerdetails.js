import React, { useRef, useEffect, useState } from 'react';
import { Slider } from "@material-ui/core";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Legend from './Legend';

import OpacityIcon from '@material-ui/icons/Opacity';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: '5px 10px',
        width: '100%'

    },
    sliderLayer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        justifyContent: 'space-between'
    },
    sliderLabels: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',

    },
    layerDesc: {
        fontSize: '.8rem',
        lineHeight: '1.2',
        margin: '0px 0px 10px 0px'
    }

});


const options = [
    {
        name: 'Basemap1',
        description: 'Estimated total population',
        property: 'pop_est',
        stops: [
            [0, '#f8d5cc'],
            [1000000, '#231266'],
            [5000000, '#f1a8a5'],
            [10000000, '#ee8f9a'],
            [50000000, '#ec739b'],
            [100000000, '#aaff12'],
            [250000000, '#c44cc0'],
            [500000000, '#9f43d7'],
            [1000000000, '#6e40e6']
        ]
    },
    {
        name: 'Basemap2',
        description: 'Estimate total GDP in millions of dollars',
        property: 'gdp_md_est',
        stops: [
            [0, '#f8d5cc'],
            [1000, '#f4bfb6'],
            [5000, '#f1a8a5'],
            [10000, '#ee8f9a'],
            [50000, '#ec739b'],
            [100000, '#dd5ca8'],
            [250000, '#c44cc0'],
            [5000000, '#9f43d7'],
            [10000000, '#6e40e6']
        ]
    }
];


const Layerdetails = ({ id, name, checked, setLayerlist, maplayers, description, opacity }) => {
    const classes = useStyles();
    const [active, setActive] = useState(options[0]);

    const handleChange = (name, value) => {
        // get the layer opacity

        const updateChecked = name = maplayers.map((layer) => {
            const slidername = name;
            if (slidername === layer.name) {
                layer.opacity = value;

            }
            return layer;
        }
        );
        setLayerlist(updateChecked);
    };



    return (
        <div className={classes.root}>
            <div className={classes.layerDesc}>
                {description}
            </div>
            <div className={classes.sliderLayer} >
                <div title="Opacity">
                    <OpacityIcon
                        title="opacity"
                        style={{
                            transform: "scale(0.8)"
                        }}
                    />
                </div>

                <div className={classes.sliderLabels}>
                    <span>0</span>
                    <Slider
                        key={name}
                        value={opacity}
                        onChange={(event, value) => handleChange(name, value)}
                        aria-labelledby="continuous-slider"
                        style={{
                            transform: "scale(0.8)",
                        }}
                    />
                    <span>100</span>
                </div>


            </div>

            Legend:
                  <Legend active={active} stops={active.stops} />

        </div>
    );

};



export default Layerdetails;
