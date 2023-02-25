import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useColorModeValue, Text } from "@chakra-ui/react";
import "./map.css";
import { darkMapStyle } from "./map-styles";
import exitSampleData from "../../data/map-sample-data";
import Exit from "../../type-definitions/exit";

interface Coordinate {
  lat: number;
  lng: number;
}

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
const libraries = ["places"] as Libraries;

interface MapProps {
  updateForm?: Function;
  editable: boolean;
}

export default function Map(props: MapProps) {
  const [center, setCenter] = useState<Coordinate>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(7);
  const [exits, setExits] = useState<Exit[]>();
  const [activeMarker, setActiveMarker] = useState<number>(0);
  const [addedMarker, setAddedMarker] = useState<Coordinate>();

  const lightMode = useColorModeValue(true, false);

  const mapStyle = lightMode ? null : darkMapStyle;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
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

  function addMarker(lat: number, lng: number) {
    setAddedMarker({ lat: lat, lng: lng });
    if (props.updateForm) props.updateForm({ lat, lng });
    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ location: { lat: lat, lng: lng } }, (results) => {
    //   if (results && results[0]) console.log(results[0]);
    // });
  }

  if (isLoaded) {
    return (
      <GoogleMap
        data-testid="google-map"
        mapContainerClassName="map-container"
        center={center}
        zoom={zoom}
        options={{ styles: mapStyle, backgroundColor: "gray" }}
        onClick={(e) => {
          if (!props.editable) return;
          if (e.latLng) {
            addMarker(e.latLng.lat(), e.latLng.lng());
          }
        }}
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
                        <Text color="black">{exit.name}</Text>
                        <Text color="black">{exit.height_impact} ft</Text>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              );
            })
          : null}
        {addedMarker ? (
          <MarkerF
            icon={`https://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png`}
            position={addedMarker}
          />
        ) : null}
      </GoogleMap>
    );
  } else {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
}
