import React from 'react'
import { BtnMyLocation, MapView, SearchBar } from '../components'


export default function HomeScreen() {
  return (
    <div className='main'>
        <MapView/>
        <BtnMyLocation/>
        <SearchBar/>
    </div>
  )
}
