import "./exit.css";
import { useEffect, useState } from "react";
import NavBar from "../../../../components/navbar/NavBar";
import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { exitData } from "../../../../data/sample-exit-data";
import { exitComments } from "../../../../data/sample-exit-comments";
import ExitTitle from "./exit-components/ExitTitle";
import ExitDetails from "./exit-components/ExitDetails";
import ExitComments from "./exit-components/ExitComments";
import ExitImages from "./exit-components/ExitImages";
import Map from "../../../../components/map/Map";
import exit from '../../../../type-definitions/exit'

import axios from "axios";

function Exit() {
  const exit = exitData[0];
  const [exitRes, setExitRes] = useState<exit>();
  const [exitImages, setExitImages] = useState();

  const exitsUrl = "http://localhost:8000/exits";

  useEffect(() => {
    getExit(exitsUrl);
  }, []);

  async function getExit(exitsUrl: string) {
    try {
      const res = await axios.get(`${exitsUrl}/1`);
      setExitImages(res.data[0]);
      // console.log(res.data[0]);
      setExitRes(res.data[1][0]);
    } catch (err: any) {
      if (err) {
        console.log(err); // NEED TO UPDATE THE ERROR HANDLING
      }
    }
  }



if (exitRes == undefined) {
  return <></>
} else {
  return (
    <div>
      <NavBar />
      <Grid className="exit-page">
        <Box className="exit-left">
          <ExitTitle exit={exitRes} />
          <ExitImages class="mobile" imgArr={exitImages}/>
          <ExitDetails exit={exitRes} />
          <div className="exit-page-map-mobile">
            <Map
              editable={false}
              exit_location={{ lat: +exitRes.lat, lng: +exitRes.lng }}
            />
          </div>
          <ExitComments comments={exitComments} />
        </Box>

        <Box className="exit-right">
          <ExitImages class="wide" imgArr={exitImages}/>
          <div className="exit-page-map-wide">
            <Map
              editable={false}
              exit_location={{ lat: +exitRes.lat, lng: +exitRes.lng }}
            />
          </div>
        </Box>
      </Grid>
    </div>
  );
}
}

export default Exit;
