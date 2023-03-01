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
  const [countryCode, setCountryCode] = useState<string>();

  return (
    <div className="dash-submit">
      <NavBar currentPage="submit" />
      <Box className="content">
        <SubmitExitForm latLng={addedMarker} country_code={countryCode} />
        <Map
          updateForm={(latLng: Coordinate, code: string) => {
            setAddedMarker(latLng);
            setCountryCode(code);
          }}
          editable={true}
        />
      </Box>
    </div>
  );
}

export default DashSubmit;
