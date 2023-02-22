import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./map.css";
import { darkMapStyle } from "./map-styles";

// remove
const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Map() {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={3}
        options={{ styles: darkMapStyle }}
      ></GoogleMap>
    );
  } else {
    return <div>Loading...</div>;
  }
}
