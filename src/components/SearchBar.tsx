import React, { ChangeEvent, useContext, useRef } from 'react'
import { PlaceContext } from '../context'
import {SearchResults} from './index'

export default function SearchBar() {

    const debounceRef = useRef<NodeJS.Timeout>()
    const {searchPlacesByTerm} = useContext(PlaceContext)
    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if(debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value)
        }, 350)

    }

    return (
        <div className='search-container'>
            <input
                type="text"
                className='form-control'
                placeholder='Search a place...'
                onChange={onQueryChanged}


            />
            <SearchResults/>
        </div>
    )
}
