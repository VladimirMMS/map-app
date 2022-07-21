import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers/getUserLocation";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlaceContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[]

}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface Props {
    children: JSX.Element
}

export default function PlacesProvider({children}: Props) {
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
    useEffect(() => {
        getUserLocation()
        .then((lngLat) => dispatch({type: 'setUserLocation', payload: lngLat}))
    }, [])

    const searchPlacesByTerm = async(query: string) => {
        if(query.length === 0) {
            dispatch({type: 'setPlaces', payload: []})
            return [];
        } 
        if(!state.userLocation) throw new Error('There no location')
        dispatch({type: 'setLoadingPlaces'})
        const resp = await searchApi.get<PlacesResponse>(`${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        })

        dispatch({type: 'setPlaces', payload: resp.data.features})
        return resp.data.features

    }
    
  return (
    <>
        <PlaceContext.Provider value={{
            ...state,
            searchPlacesByTerm,
            places: state.places,
            isLoadingPlaces: state.isLoadingPlaces
        }}>
            {children}
        </PlaceContext.Provider>
    </>

  )
}
