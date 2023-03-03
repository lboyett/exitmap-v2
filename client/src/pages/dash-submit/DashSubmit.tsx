import { Box, Button, Heading } from "@chakra-ui/react";
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
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  return (
    <div className="dash-submit">
      <NavBar currentPage="submit" />
      <Box className="content">
        {submitSuccess ? (
          <Box className="submit-success-div">
            <Heading as="h4">Exit submitted successfully.</Heading>
            <Box>
              We will review your exit to make sure it meets our standards.
              Jumper safety is our #1 priority at ExitMap.
            </Box>
            <Button onClick={() => setSubmitSuccess(false)}>
              Submit another exit
            </Button>
          </Box>
        ) : (
          <SubmitExitForm
            latLng={addedMarker}
            country_code={countryCode}
            onSuccess={() => {
              setSubmitSuccess(true);
            }}
          />
        )}
        {submitSuccess ? null : (
          <div>
            <Map
              updateForm={(latLng: Coordinate, code: string) => {
                setAddedMarker(latLng);
                setCountryCode(code);
              }}
              editable={true}
            />
          </div>
        )}
      </Box>
    </div>
  );
}

export default DashSubmit;
