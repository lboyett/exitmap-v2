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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  ModalCloseButton,
  ModalBody,
  List,
  ListItem,
  Text,
  Flex,
  useDisclosure,
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
import useWindowDimensions from "../../hooks/useWindowDimensions";
import FileInput from "../../components/submit-exit-form/file-input/FileInput";

function Exit() {
  const [exitRes, setExitRes] = useState<exit>();
  const [exitImages, setExitImages] = useState<imgArrType[]>();
  const [exitComments, setExitComments] = useState<commentsTypes[]>();
  const [noImage, setNoImage] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>();
  const [tabsIsLazy, setTabsIsLazy] = useState(true);
  const { height, width } = useWindowDimensions();
  const { exit_id } = useParams();

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const lightMode = useColorModeValue(true, false);

  const exitsUrl = "http://localhost:8000/exits";
  const imageUrl = "http://localhost:8000/images";

  useEffect(() => {
    getExit(exitsUrl);
  }, []);

  useEffect(() => {
    setNoImage(false);
  }, [formData]);

  async function submitExitImage(formData: FormData | undefined) {
    formData?.delete("exit");
    formData?.delete("submitted_by");
    if (exitRes) formData?.append("exit", exitRes._id.toString());
    formData?.append("submitted_by", "1");
    try {
      const res = await axios.post(imageUrl, formData);
    } catch (err: any) {
      console.log(err);
    }
  }

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
              {width < 700 ? (
                <Map
                  editable={false}
                  exit_location={{ lat: +exitRes.lat, lng: +exitRes.lng }}
                />
              ) : null}
            </div>
            <ExitComments
              comments={exitComments}
              exit_id={exit_id}
              getExit={() => getExit(exitsUrl)}
            />
          </Box>

          <Box className="exit-right">
            <Tabs isLazy={tabsIsLazy} align="center">
              <TabList className="tab-list">
                <Tab
                  _selected={{
                    color: `white`,
                    bg: `${lightMode ? txt_500 : bg_500}`,
                  }}
                >
                  Images
                </Tab>
                <Tab
                  _selected={{
                    color: `white`,
                    bg: `${lightMode ? txt_500 : bg_500}`,
                  }}
                >
                  <p onClick={changeIsLazy}>Map</p>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Modal
                    isOpen={isOpen}
                    onClose={() => {
                      setNoImage(false);
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent className="image-upload-modal" bg={bg_500}>
                      <ModalCloseButton />
                      <ModalBody>
                        <form
                          onSubmit={(e) => {
                            if (!formData) {
                              e.preventDefault();
                              setNoImage(true);
                              return;
                            }
                            submitExitImage(formData);
                          }}
                        >
                          <FileInput
                            updateForm={(formData: FormData) => {
                              setFormData(formData);
                            }}
                            isInvalidFileType={false}
                          />
                          <Flex className="upload-button-container">
                            <Button type="submit">Upload</Button>
                            {noImage ? (
                              <Text className="image-error-message">
                                Please upload an image
                              </Text>
                            ) : null}
                          </Flex>
                        </form>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <ExitImages class="wide" imgArr={exitImages} />
                  <Button onClick={onOpen} className="open-upload-modal-button">
                    Upload Image
                  </Button>
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
