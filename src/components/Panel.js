import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Layerrow from "./Layerrow";
import Layerdetails from "./Layerdetails";
import FilterPanel from "./FilterPanel";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import RoomIcon from '@material-ui/icons/Room';
import LayersIcon from '@material-ui/icons/Layers';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const Panel = ({ maplayers, setLayerlist, styling, points, setPoints, categories, setCategories, incidentDate, setincidentDate }) => {
    const [displayFPanel, setdisplayFPanel] = useState(true);
    const [displayLPanel, setdisplayLPanel] = useState(true);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(maplayers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setLayerlist(items);

    }

    function toggle() {
        setdisplayFPanel(true);

    }

    function toggle2() {
        setdisplayLPanel(!displayLPanel);
    }

    return (
        <div>
            <div className="">
                <div className="bg-white absolute mt12 ml12 shadow-darken10 round">
                    <IconButton onClick={toggle2}>
                        <LayersIcon></LayersIcon>
                    </IconButton>
                </div>

            </div>

            <div className={displayLPanel ? null : 'hidden'}>
                <div id='layerpanel' className="bg-white absolute mt12 ml12 py12 px12 shadow-darken10 round z1 width400">
                    <div className="panelTitleRow">
                        <div className="panelTitle">
                            Layers
                        </div>
                        <div>
                            <IconButton onClick={toggle2}>
                                <ChevronLeftIcon></ChevronLeftIcon>
                            </IconButton>
                        </div>
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
                                                                    styling={styling}
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
            <div className={displayLPanel ? 'filterPanelexp' : 'filterPanelcol'}>
                <div>
                    <div className="bg-white absolute mt12 shadow-darken10 round">
                        <IconButton onClick={toggle}>
                            <RoomIcon></RoomIcon>
                        </IconButton>
                    </div>

                </div>
                <div className={displayFPanel ? null : 'hidden'}>
                    <div className="bg-white absolute mt12 py12 px12 shadow-darken10 round z1 width290">
                        <FilterPanel
                            displayFPanel={displayFPanel}
                            setdisplayFPanel={setdisplayFPanel}
                            points={points}
                            setPoints={setPoints}
                            categories={categories}
                            setCategories={setCategories}
                            incidentDate={incidentDate}
                            setincidentDate={setincidentDate}
                        ></FilterPanel>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default Panel;
