import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import Optionsfield from './components/Optionsfield';
import './Map.css';

import axios from 'axios';

import externalStyling from './env/styling.json';

import externallayers from './env/layers.json';
import accessKey from './env/key.json';

import Panel from './components/Panel';

mapboxgl.accessToken = 'pk.eyJ1IjoicnVtcC1jb25mbGljdGFsZXJ0IiwiYSI6ImNrczRiMjhlbjFvN2gyeXJ3cWVmNGJueWoifQ.4PjwrtDVrh5i919c0hBCTA';

const Map = () => {

  const baseMaps = [
    {
      name: 'Streets',
      url: 'mapbox://styles/mapbox/streets-v11'
    },
    {
      name: 'Satellite',
      url: 'mapbox://styles/mapbox/satellite-v9'
    },
    {
      name: 'Light',
      url: 'mapbox://styles/mapbox/light-v10'
    },
    {
      name: 'Dark',
      url: 'mapbox://styles/mapbox/dark-v10'
    }
  ];

  const pointColor = {
    'shadow': '#727272',
    'resource': '#01a812',
    'political': '#f82d00',
    'identity': '#ffa32b',
    'common': '#00a1d6',
    'governance': '#8d00bc',
    'other': '#ffffff'

  };
  const catLabel =
  {
    'shadow': 'Shadow economy',
    'resource': 'Resource issue',
    'political': 'Political issue',
    'identity': 'Identity issue',
    'common': 'Common crome',
    'governance': 'Governance issue',
    'other': 'Other issue'

  };


  // const layers = Object.values(externallayers);

  const [layerlist, setLayerlist] = useState(null);
  const [points, setPoints] = useState(null);
  const [categories, setCategories] = useState(null);
  const [incidentDate, setincidentDate] = useState(null);



  const [isLoading, setLoading] = useState(true);

  const mapContainerRef = useRef(null);

  const [map, setMap] = useState(null);

  const [activeBaseMap, setBaseMap] = useState(baseMaps[0]);

  const [styling, setStyling] = useState(externalStyling);




  const repaintMap = () => {

    const test = [...layerlist].reverse();

    test.map(layer => {
      if (layer.checked) {
        map.addLayer({
          'id': layer.name,
          'type': layer.type,
          'source': layer.name,
          "source-layer": layer.column,
          "paint": styling[layer.name].paint
        });

      } else {
        if (map.getLayer(layer.name) !== undefined) {
          map.removeLayer(layer.name);
        }

      }
    });

  }


  // Initialize map when component mounts
  useEffect(() => {

    fetchData();

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: activeBaseMap.url,
      center: [124, 8],
      zoom: 7,
      maxZoom: 15,
      minZoom: 7

    });

    map.on('load', () => {
      setMap(map);

    });
    map.addControl(new mapboxgl.NavigationControl());


    // loop remove 7 incidents layer
    // loop add 7 incidents layer


    // Clean up on unmount
    return () => map.remove();
  }, []);




  useEffect(() => {
    if (map) {
      rebuildMap(map);
    }

  }, [layerlist]);

  useEffect(() => {
    if (map) {
      map.setStyle(activeBaseMap.url);
      map.on('style.load', () => {
        rebuildMap(map);
      })

    }

  }, [activeBaseMap]);


  useEffect(() => {
    if (map) {
      rebuildMap(map);
    }
  }, [categories]);

  useEffect(() => {
    if (map) {
      rebuildMap(map);
    }

  }, [incidentDate]);

  const changeBaseMap = i => {
    setBaseMap(baseMaps[i]);

  };

  const filterCat = () => {
    console.log('====================');

    if (categories != null) {


      categories.forEach(element => {
        const catName = Object.keys(element)[0];
        const catVal = Object.values(element)[0];

        if (catVal) {
          let fpoints = points.filter(function (currentElement) {
            return currentElement.cause == catLabel[catName];

          });

          let ffpoints = fpoints.filter(function (currentElement) {
            return (currentElement.year >= incidentDate[0].start) && (currentElement.year <= incidentDate[1].end);

          });



          if (map.getLayer(catName) !== undefined) {
            map.removeLayer(catName);
            map.removeSource(catName);

          }
          console.log(ffpoints);
          //arrange allPoints into different arrays
          const allPoints = ffpoints.map(incident =>
          (
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [incident.location.longitude, incident.location.latitude]
              }
            }));

          console.log(allPoints);


          map.addLayer({
            id: catName,
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: allPoints
              }
            },
            paint: { "circle-color": pointColor[catName] }
          });







        } else {
          if (map.getLayer(catName) !== undefined) {
            map.removeLayer(catName);
            map.removeSource(catName);

            console.log('remove ', catName);
          }
        }
      });
    }
  };

  const filterYear = () => {
    if (categories != null) {


      console.log(fpoints);
    }
  };



  const fetchData = async () => {
    let response = await axios.get('data.json')
    let res = await response.data;
    setLayerlist(Object.values(res));
    let response2 = await axios.get('incidents.json')
    let res2 = await response2.data;
    setPoints(Object.values(res2));

    setLoading(false);

    setCategories(
      [
        {
          'shadow': false
        }, {
          'resource': false
        }, {
          'political': false
        }, {
          'identity': false
        }, {
          'common': false
        }, {
          'governance': false
        }, {
          'other': false
        }
      ]
    );


    setincidentDate([{ 'start': 2010 }, { 'end': 2021 }]);
  }


  const rebuildMap = (map) => {
    resetSources();
    repaintMap();
    setMap(map);
    filterCat();
  }

  const resetSources = () => {
    if (map) {
      layerlist.map(layer => {

        if (map.getLayer(layer.name) !== undefined) {
          map.removeLayer(layer.name);
        }

        if (map.getSource(layer.name)) {
          map.removeSource(layer.name);
        }



        map.addSource(layer.name, {
          type: 'vector',
          url: 'mapbox://' + layer.url,
          minzoom: 2
        });

      });
    }
  }

  if (isLoading) {
    return (
      <div>

        <div ref={mapContainerRef} className='map-container' />

      </div>
    );
  }


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
        points={points}
        setPoints={setPoints}
        styling={styling}
        categories={categories}
        setCategories={setCategories}
        incidentDate={incidentDate}
        setincidentDate={setincidentDate}
      />
    </div>
  );
};

export default Map;
