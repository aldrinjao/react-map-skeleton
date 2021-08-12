import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Optionsfield from './components/Optionsfield';
import './Map.css';

import externallayers from './layers.json';
import accessKey from './key.json';
import externalBaseMaps from './basemaps.json';

import Panel from './components/Panel';



mapboxgl.accessToken = accessKey.key;

const Map = () => {

  const baseMaps = [
    {
      name: 'Streets',
      url: 'mapbox://styles/mapbox/streets-v11'
    },
    {
      name: 'Light',
      url: 'mapbox://styles/mapbox/light-v10'
    },
    {
      name: 'Dark',
      url: 'mapbox://styles/mapbox/dark-v10'
    },
    {
      name: 'Satellite',
      url: 'mapbox://styles/mapbox/satellite-v9'
    }
  ];



  const layers = Object.values(externallayers);
  const [layerlist, setLayerlist] = useState(layers);

  const mapContainerRef = useRef(null);

  const [map, setMap] = useState(null);

  const [activeBaseMap, setBaseMap] = useState(baseMaps[0]);

  console.log(activeBaseMap.url.toString());

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: activeBaseMap.url,
      center: [124, 8],
      zoom: 7
    });

    map.on('load', () => {
      const test = layerlist.map(layer => {
        map.addSource(layer.name, {
          type: 'vector',
          url: 'mapbox://' + layer.url
        });

      });

      setMap(map);

      // console.log(map.getStyle().sources);

    });
    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    console.log('repaint map');

  }, [layerlist]);


  useEffect(() => {
    if (map) {
      map.setStyle(activeBaseMap.url);
    }
  }, [activeBaseMap]);

  const changeBaseMap = i => {
    setBaseMap(baseMaps[i]);
  };

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
      <Optionsfield
        basemaps={baseMaps}
        activeBaseMap={activeBaseMap}
        changeBaseMap={changeBaseMap}
      />
      <Panel
        maplayers={layerlist}
        setLayerlist={setLayerlist}
      />
    </div>
  );
};

export default Map;
