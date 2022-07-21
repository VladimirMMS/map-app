import { MapState } from "./MapProvider";
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import {Map, Marker} from '!mapbox-gl'

type MapAction = {type: 'setMap', payload: Map} |  {type: 'setMarker', payload: Marker[]}

export const mapReducer = (state: MapState, action: MapAction): MapState => {
    switch (action.type) {
        case 'setMap':
            console.log(action.payload)
            return {
                ...state,
                isMapReady: true,
                map: action.payload

            }
        case 'setMarker':
            return {
                ...state,
                markers: action.payload 
            }
    
        default:
            return state

    }   

}