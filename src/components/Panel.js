import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Layerrow from "./Layerrow";
import Layerdetails from "./Layerdetails";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Panel = ({ maplayers, setLayerlist, redraw }) => {

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(maplayers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLayerlist(items);

        // redraw('from drag');


    }

    return (
        <div>
            <div id='layerpanel' className="bg-white absolute mt12 ml12 py12 px12 shadow-darken10 round z1 width300">
                <div id="paneltitle">
                    Layers
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="layers">
                        {(provided) => (
                            <ul  {...provided.droppableProps} ref={provided.innerRef} className='cardcontainer'>
                                {maplayers.map(({ id, name, checked, opacity, description }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} className='listitem'>

                                                    <Accordion className="layeracc">
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <div className="layerRow" >
                                                                <span className="material-icons handle" title="drag to reorder"  {...provided.dragHandleProps} >
                                                                    drag_indicator
                                                                </span>

                                                                <Layerrow
                                                                    id={id}
                                                                    name={name}
                                                                    checked={checked}
                                                                    setLayerlist={setLayerlist}
                                                                    maplayers={maplayers}
                                                                />
                                                            </div>

                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Layerdetails
                                                                id={id}
                                                                name={name}
                                                                checked={checked}
                                                                setLayerlist={setLayerlist}
                                                                maplayers={maplayers}
                                                                opacity={opacity}
                                                                description={description}
                                                            />

                                                        </AccordionDetails>
                                                    </Accordion>
                                                </li>
                                            )}
                                        </Draggable>
                                    )

                                        ;
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>







            </div>
        </div>
    );
};

export default Panel;
