import React, {useEffect, useRef} from "react"

type Coords = {
    lat: number,
    lng: number
}

const GoogleMap = ({lat, lng}: Coords) => {
    const googleMapRef: any = useRef();
    const googleMap: React.MutableRefObject<undefined | google.maps.Map> = useRef();
    const marker: React.MutableRefObject<undefined | google.maps.Marker> = useRef();
    const mapOptions = {
        KEY: process.env.REACT_APP_GAPI_KEY, //replace with your API key
        zoom: 18,
        height: 500,
        width: 500
    }

    const createGoogleMap = (): google.maps.Map =>
        new window.google.maps.Map(googleMapRef.current, {
            center: {lat, lng},
            zoom: mapOptions.zoom
        });

    const createMarker = (): google.maps.Marker =>
        new window.google.maps.Marker({
            position: {lat, lng},
            map: googleMap.current
        });

    useEffect((): void => {
        const makeMap = (): void => {
            googleMap.current = createGoogleMap();
            marker.current = createMarker();
        }
        if (!window.google) {
            const googleMapScript: HTMLScriptElement = document.createElement('script');
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${mapOptions.KEY}`;
            googleMapScript.defer = true;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener('load', makeMap);
            return;
        }
        makeMap();
    });

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={{width: mapOptions.width, height: mapOptions.height}}
        />
    )
}

export default React.memo(GoogleMap);