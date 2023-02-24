import { Box } from "@chakra-ui/react";
import NavBar from "../../components/navbar/NavBar";
import SubmitExitForm from "../../components/submit-exit-form/SubmitExitForm";
import Map from "../../components/map/Map";
import "./dash-submit.css";

function DashSubmit() {
  return (
    <div className="dash-submit">
      <NavBar currentPage="submit" />
      <Box className="content">
        <SubmitExitForm />
        <Map />
      </Box>
    </div>
  );
}

export default DashSubmit;
