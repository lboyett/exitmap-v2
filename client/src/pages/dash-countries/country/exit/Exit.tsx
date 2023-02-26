import "./exit.css";
import NavBar from "../../../../components/navbar/NavBar";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Grid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { exitData } from "../../../../data/sample-exit-data";
import ExitTitle from "./exit-components/ExitTitle";
import ExitDetails from "./exit-components/ExitDetails";

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
          
          <ExitTitle exit={exit}/>
          <ExitDetails exit={exit} />

          <Box className="exit-comments">Comments</Box>
        </Box>

        <Box className="exit-right">
          <Image
            src={`${exit.image}`}
            alt="pic of exit"
            className="exit-image"
          />

          <Flex className="exit-image-carousel">Carousel</Flex>

          <Box className="exit-map">Map</Box>
        </Box>
      </Grid>
    </div>
  );
}

export default Exit;
