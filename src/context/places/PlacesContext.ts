import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [ number, number];
    isLoadingPlaces: boolean;
    places: Feature[]
    searchPlacesByTerm: (query: string) => Promise<Feature[]>
}


export const PlaceContext = createContext({} as PlacesContextProps);