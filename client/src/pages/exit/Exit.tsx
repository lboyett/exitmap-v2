import "./exit.css";
import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  Box,
  Grid,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { exitComments } from "../../data/sample-exit-comments";
import ExitTitle from "../../components/exit-title/ExitTitle";
import ExitDetails from "../../components/exit-details/ExitDetails";
import ExitComments from "../../components/exit-comments/ExitComments";
import ExitImages from "../../components/exit-images/ExitImages";
import Map from "../../components/map/Map";
import exit from "../../type-definitions/exit";
import { imgArrType } from "../../components/exit-images/ExitImages";
import { commentsTypes } from "../../components/exit-comments/ExitComments";
import axios from "axios";
import { useParams } from "react-router-dom";

function Exit() {
  const [exitRes, setExitRes] = useState<exit>();
  const [exitImages, setExitImages] = useState<imgArrType[]>();
  const [exitComments, setExitComments] = useState<commentsTypes[]>();
  const [tabsIsLazy, setTabsIsLazy] = useState(true);
  const { exit_id } = useParams();

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");

  const exitsUrl = "http://localhost:8000/exits";

  useEffect(() => {
    getExit(exitsUrl);
  }, []);

  async function getExit(exitsUrl: string) {
    try {
      const res = await axios.get(`${exitsUrl}/${exit_id}`);
      setExitRes(res.data.data[0]);
      setExitImages(res.data.images);
      setExitComments(res.data.comments); // Look into promise.all
    } catch (err: any) {
      if (err) {
        console.log(err); // NEED TO UPDATE THE ERROR HANDLING
      }
    }
  }

  function changeIsLazy() {
    setTabsIsLazy(false);
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
            <ExitImages class="mobile" imgArr={exitImages} />
            <ExitDetails exit={exitRes} />
            <div className="exit-page-map-mobile">
              <Map
                editable={false}
                exit_location={{ lat: +exitRes.lat, lng: +exitRes.lng }}
              />
            </div>
            <ExitComments
              comments={exitComments}
              exit_id={exit_id}
              getExit={() => getExit(exitsUrl)}
            />
          </Box>

          <Box className="exit-right">
            <Tabs isLazy={tabsIsLazy}>
              <TabList>
                <Tab _selected={{ color: `${txt_500}`, bg: `${bg_500}` }}>
                  Images
                </Tab>
                <Tab _selected={{ color: `${txt_500}`, bg: `${bg_500}` }}>
                  <p onClick={changeIsLazy}>Map</p>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ExitImages class="wide" imgArr={exitImages} />
                </TabPanel>

                <TabPanel>
                  <Map
                    editable={false}
                    exit_location={{ lat: +exitRes.lat, lng: +exitRes.lng }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Grid>
      </div>
    );
  }
}

export default Exit;
