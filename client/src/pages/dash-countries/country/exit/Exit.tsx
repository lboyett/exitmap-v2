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
import exit from "../../../../type-definitions/exit";
import { imgArrType } from "./exit-components/ExitImages";
import { commentsTypes } from "./exit-components/ExitComments";

import axios from "axios";

function Exit() {
  const exit = exitData[0];
  const [exitRes, setExitRes] = useState<exit>();
  const [exitImages, setExitImages] = useState<imgArrType[]>();
  const [exitComments, setExitComments] = useState<commentsTypes[]>();

  const exitsUrl = "http://localhost:8000/exits";

  useEffect(() => {
    getExit(exitsUrl);
  }, []);

  async function getExit(exitsUrl: string) {
    try {
      const res = await axios.get(`${exitsUrl}/1`);
      console.log(res.data);
      setExitRes(res.data.data[0]);
      setExitImages(res.data.images);
      setExitComments(res.data.comments); // Look into promise.all
    } catch (err: any) {
      if (err) {
        console.log(err); // NEED TO UPDATE THE ERROR HANDLING
      }
    }
  }

  if (exitRes == undefined) {
    return <></>;
  } else {
    return (
      <div>
        <NavBar />
        <Grid className="exit-page">
          <Box className="exit-left">
            <ExitTitle exit={exitRes} />
            <ExitImages class="mobile" exit={exit} imgArr={exitImages} />
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
            <ExitImages class="wide" exit={exit} />
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
