import React from 'react'
import { MapProvider, PlacesProvider } from './context/index'
import HomeScreen from './screens/HomeScreen'

export default function MapsApp() {
  return (
    <div>

      <PlacesProvider>
        <MapProvider>
          <HomeScreen />
        </MapProvider>
      </PlacesProvider>

    </div>
  )
}
