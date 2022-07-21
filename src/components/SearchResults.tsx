import React, { useContext, useState } from 'react'
import { MapContext, PlaceContext } from '../context'
import { Feature } from '../interfaces/places'

export default function SearchResults() {
    const { places, isLoadingPlaces, userLocation } = useContext(PlaceContext)
    const { map, getRouteBetweenPoints } = useContext(MapContext)
    const [activeId, setActiveId] = useState('');
    if (isLoadingPlaces) {
        return (
            <div className='alert alert-primary'>
                <h6>Searching...</h6>
                <p>Wait</p>

            </div>
        )
    }
    const getRoute = (place: Feature) => {
        if(!userLocation) return;
        const [lng, lat] = place.center
        getRouteBetweenPoints(userLocation, [lng, lat])
    }

    const onPlaceClick = (place: Feature) => {
        setActiveId(place.id)
        const [lng, lat] = place.center
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })

    }

    return (
        <ul className='list-group mt-3'>
            {
                places.map(place => (
                    <li className={`list-group-item list-group-item-action poiner ${activeId === place.id && 'active'}`} key={place.id} onClick={() => onPlaceClick(place)}>
                        <h6>{place.text_es}</h6>
                        <p className='text-muted' style={{ fontSize: '12px' }}>
                            {place.place_name}
                        </p>
                        <button className={`btn ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`} onClick={() =>getRoute(place)}>Directions</button>

                    </li>

                ))
            }
        </ul>
    )
}

