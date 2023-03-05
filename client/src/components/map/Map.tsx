import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useColorModeValue, Text, Box } from "@chakra-ui/react";
import "./map.css";
import { darkMapStyle } from "./map-styles";
import Exit from "../../type-definitions/exit";
import useReviewedExitsFetch from "../../hooks/useReviewedExitsFetch";

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

interface exit_location_type {
  lat: number;
  lng: number;
}

interface SearchBox extends google.maps.places.SearchBox {}

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  updateForm?: Function;
  editable: boolean;
  exit_location?: exit_location_type;
}

export default function Map(props: MapProps) {
  const [center, setCenter] = useState<Coordinate>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(7);
  const [exits, setExits] = useState<Exit[]>();
  const [exitPageLocation, setExitPageLocation] =
    useState<exit_location_type>();
  const [activeMarker, setActiveMarker] = useState<number>(0);
  const [addedMarker, setAddedMarker] = useState<Coordinate>();
  const [searchBox, setSearchBox] = useState<SearchBox>();
  const { data, error, loading } = useReviewedExitsFetch(); //FixThis

  const lightMode = useColorModeValue(true, false);
  const mapStyle = lightMode ? null : darkMapStyle;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (data !== undefined) setExits(data);
  }, [data]);

  useEffect(() => {
    if (props.exit_location) {
      setCenter({ lat: props.exit_location.lat, lng: props.exit_location.lng });
      setExitPageLocation({
        lat: props.exit_location.lat,
        lng: props.exit_location.lng,
      });
      return;
    }
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

  async function handleMapClick(lat: number, lng: number) {
    setAddedMarker({ lat: lat, lng: lng });
    try {
      const code = await getCountryCode(lat, lng);
      if (props.updateForm) props.updateForm({ lat, lng }, code);
    } catch (err) {}
  }

  async function getCountryCode(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({
        location: { lat: lat, lng: lng },
      });
      const l = response.results.length;
      return response.results[l - 1].address_components[0].short_name;
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoaded) {
    return (
      <Box className="map-component-container">
        <Box className="search-box">
          <StandaloneSearchBox
            onPlacesChanged={() => {
              if (searchBox) {
                const searchResults = searchBox.getPlaces();
                if (searchResults && searchResults.length > 0) {
                  const lat = searchResults[0].geometry?.location?.lat();
                  const lng = searchResults[0].geometry?.location?.lng();
                  if (lat && lng) {
                    setCenter({ lat: lat, lng: lng });
                    setZoom(7);
                  }
                }
              }
            }}
            onLoad={(ref) => setSearchBox(ref)}
          >
            <input type="text" placeholder="Search" />
          </StandaloneSearchBox>
        </Box>
        <GoogleMap
          data-testid="google-map"
          mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
          options={{ styles: mapStyle, backgroundColor: "gray" }}
          onClick={(e) => {
            if (!props.editable) return;
            if (e.latLng) {
              handleMapClick(e.latLng.lat(), e.latLng.lng());
            }
          }}
        >
          {exits
            ? exits.map((exit) => {
                return (
                  <MarkerF
                    onClick={() => handleMarkerClick(exit._id)}
                    key={exit._id}
                    position={{ lat: +exit.lat, lng: +exit.lng }}
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
              icon={`https://www.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png`}
              position={addedMarker}
            />
          ) : null}
          {exitPageLocation ? <MarkerF position={exitPageLocation} /> : null}
        </GoogleMap>
      </Box>
    );
  } else {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
}
