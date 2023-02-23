import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import "./map.css";
import { darkMapStyle } from "./map-styles";
import exitSampleData from "./map-sample-data";
import Exit from "../../type-definitions/exit";

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Map() {
  const [center, setCenter] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(7);
  const [exits, setExits] = useState<Exit[]>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setExits(exitSampleData);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setCenter({ lat: res.coords.latitude, lng: res.coords.longitude });
        },
        (err) => setZoom(3)
      );
    }
  }, []);

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={zoom}
        options={{ styles: darkMapStyle, backgroundColor: "gray" }}
      >
        {exits
          ? exits.map((exit) => {
              return (
                <MarkerF
                  key={exit._id}
                  position={{ lat: exit.lat, lng: exit.lng }}
                ></MarkerF>
              );
            })
          : null}
      </GoogleMap>
    );
  } else {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
}
