import React, { useContext } from 'react'
import { MapContext, PlaceContext } from '../context'

export default function BtnMyLocation() {
    const {  userLocation } = useContext(PlaceContext)
    const {isMapReady, map} = useContext(MapContext)
    
    const onClick = () => {
        if(!isMapReady) throw new Error('Map is not ready')
        if(!userLocation) throw new Error('There is not Location')

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })

    }

    return (
        <div className='btn btn-primary con-b'>
            <button
            onClick={onClick} 
                className='btn btn-primary' 
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 999

            }}>
                Current Location
            </button>

        </div>
    )
}
