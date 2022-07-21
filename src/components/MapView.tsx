/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useLayoutEffect, useRef } from 'react'
import { MapContext, PlaceContext } from '../context'
import LoadingMap from './Loading'
import '../index.css'
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'

export default function MapView() {
    const { isLoading, userLocation } = useContext(PlaceContext)
    const mapDiv = useRef<HTMLDivElement>(null)
    const {setMap} = useContext(MapContext)
    useLayoutEffect(() => {
        if(!isLoading) {
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 14, // starting zoom
            });
            setMap(map)

        }
      
    }, [isLoading,userLocation])
    if (isLoading) {
        return (<LoadingMap/>) 
    }

    return (
        <div ref={mapDiv}
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0

            }}
        >
            {userLocation?.join(',')}
        </div>
    )
}
