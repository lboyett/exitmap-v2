import { Box } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import SubmitExitForm from "../../components/submit-exit-form/SubmitExitForm";
import Map from "../../components/map/Map";
import "./dash-submit.css";

interface Coordinate {
  lat: number;
  lng: number;
}

// useContext for added markers?

function DashSubmit() {
  const [addedMarker, setAddedMarker] = useState<Coordinate | undefined>();
  return (
    <div className="dash-submit">
      <NavBar currentPage="submit" />
      <Box className="content">
        <SubmitExitForm addedMarker={addedMarker} />
        <Map
          updateForm={(latLng: Coordinate) => {
            setAddedMarker(latLng);
          }}
        />
      </Box>
    </div>
  );
}

export default DashSubmit;
