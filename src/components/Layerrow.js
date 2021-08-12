import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const Layerrow = ({ id, name, checked, setLayerlist, maplayers}) => {

    const value = '100';

    const handleChange = (event) => {
        event.stopPropagation();
        //get the ordered & checked layers
        const updateChecked = maplayers.map((layer) => {
            const flag = event.target.checked;
            const cboxname = event.target.name;

            if (cboxname === layer.name) {
                layer.checked = !layer.checked;
            }
            return layer;
        }
        );
        
        setLayerlist(updateChecked);
    };


    return (

        <div>

            <Checkbox
                color="primary"
                id={id}
                name={name}
                checked={checked}
                onClick={handleChange}
                title="toggle layer"
                style={{
                    transform: "scale(0.8)",
                }} />
            {name}


        </div>
    );

};



export default Layerrow;
