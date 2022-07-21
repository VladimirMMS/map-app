import axios from 'axios'

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoidmxhZGltaXIyMDAxIiwiYSI6ImNsNXNrMThseTJic2EzanBpM3h2OGVsZDUifQ.ZLVhAaoTnxkoOgfdb8xrCg'

    }
})


export default directionApi;