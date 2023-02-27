import "./exit.css";
import NavBar from "../../../../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import { Flex, Box, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import { exitData } from "../../../../data/sample-exit-data";
import { exitComments } from "../../../../data/sample-exit-comments";
import ExitTitle from "./exit-components/ExitTitle";
import ExitDetails from "./exit-components/ExitDetails";
import ExitComments from "./exit-components/ExitComments";
import ExitImages from "./exit-components/ExitImages";
import Map from "../../../../components/map/Map";

function Exit() {
  const { exit_name } = useParams();
  const exit = exitData[0];

  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  return (
    <div>
      <NavBar />
      <Grid className="exit-page">
        <Box className="exit-left">
          <ExitTitle exit={exit} />
          <ExitImages class='mobile' exit={exit} />
          <ExitDetails exit={exit} />
          <ExitComments comments={exitComments} />
        </Box>

        <Box className="exit-right">
          <ExitImages class='wide' exit={exit} />
          <Map editable={false} exit_location={{lat: exit.lat, lng: exit.lng}}/>
        </Box>
      </Grid>
    </div>
  );
}

export default Exit;
