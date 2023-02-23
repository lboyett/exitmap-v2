import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useColorModeValue } from "@chakra-ui/react";
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
  const [activeMarker, setActiveMarker] = useState<number>(0);

  const lightMode = useColorModeValue(true, false);

  const mapStyle = lightMode ? null : darkMapStyle;

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

  function handleMarkerClick(id: number) {
    if (exits)
      exits.forEach((exit) => {
        if (exit._id === id) {
          setActiveMarker(id);
        }
      });
  }

  if (isLoaded) {
    return (
      <GoogleMap
        data-testid="google-map"
        mapContainerClassName="map-container"
        center={center}
        zoom={zoom}
        options={{ styles: mapStyle, backgroundColor: "gray" }}
      >
        {exits
          ? exits.map((exit) => {
              return (
                <MarkerF
                  onClick={() => handleMarkerClick(exit._id)}
                  key={exit._id}
                  position={{ lat: exit.lat, lng: exit.lng }}
                >
                  {activeMarker === exit._id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
                      <div className="info-box-content">
                        <div>{exit.name}</div>
                        <div>{exit.height_impact}</div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              );
            })
          : null}
      </GoogleMap>
    );
  } else {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
}
