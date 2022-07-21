/* eslint-disable react-hooks/exhaustive-deps */
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl'
import { useContext, useEffect, useReducer } from 'react';
import { directionApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import { PlaceContext } from '../places/PlacesContext';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],

}

interface Props {
  children: JSX.Element
}

export default function MapProvider({ children }: Props) {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = useContext(PlaceContext)
  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`
          <h6>${place.text}</h6>
          <p>${place.place_name}</p>
        `)
      const newMarket = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarket)
      dispatch({ type: 'setMarker', payload: newMarkers })
    }
  }, [places])

  const setMap = (map: Map) => {
    const pupup = new Popup().setHTML(`<h4>Here i am</h4><p>In some place in the world</p>`)
    new Marker().setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(pupup)

    dispatch({ type: 'setMap', payload: map })
  }
  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
    const { geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry
    // let kms = distance / 1000
    // kms = Math.round(kms * 100)
    // kms /= 100
    // const minute = Math.floor(duration / 60)

    const bounds = new LngLatBounds(start, start)
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)

    }
    state.map?.fitBounds(bounds, {
      padding: 200
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]

      }
    }
    if(state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }
    state.map?.addSource('RouteString', sourceData)

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join':'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })


  }

  return (
    <div>
      <MapContext.Provider value={{
        ...state,
        setMap,
        getRouteBetweenPoints

      }}>
        {children}
      </MapContext.Provider>
    </div>
  )
}
