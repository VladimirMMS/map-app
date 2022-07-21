import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        languaje: 'es',
        access_token: 'pk.eyJ1IjoidmxhZGltaXIyMDAxIiwiYSI6ImNsNXNrMThseTJic2EzanBpM3h2OGVsZDUifQ.ZLVhAaoTnxkoOgfdb8xrCg'

    }
})


export default searchApi;