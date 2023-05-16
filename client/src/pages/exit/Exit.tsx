import "./exit.css";
import { useContext, useEffect, useState } from "react";
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
  Spinner,
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
import { UserContext } from "../../context/UserContext";
import { getSignedUrl } from "../../components/submit-exit-form/submit-exit-functions";
import uniqid from "uniqid";

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
  const [user, setUser] = useContext(UserContext);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const lightMode = useColorModeValue(true, false);
  const exitsUrl = `${import.meta.env.VITE_SERVER_DOMAIN}/exits`;
  useEffect(() => {
    getExit(exitsUrl);
  }, []);

  useEffect(() => {
    if (formData) setUploadError("");
  }, [formData]);

  async function submitExitImage(formData: FormData) {
    setUploadingImage(true);
    setUploadError("");
    const imageUrl = `${import.meta.env.VITE_SERVER_DOMAIN}/images`;
    try {
      const { signedUrl, key } = await getSignedUrl();
      const file = formData.get("image") as File;
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      await axios.post(imageUrl, {
        submitted_by: user._id,
        exit: exit_id,
        url: `https://lboyett-exitmap-v2.s3.eu-central-1.amazonaws.com/${key}`,
        key: key,
        is_main: false,
      });
      onClose();
      getExit(exitsUrl);
    } catch (err: any) {
      setUploadError("Error uploading image. Please try again or contact us.");
    } finally {
      setUploadingImage(false);
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
            <ExitImages
              class="mobile"
              imgArr={exitImages}
              key={`${uniqid()}`}
            />
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
                      setUploadError("");
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent className="image-upload-modal" bg={bg_500}>
                      <ModalCloseButton />
                      <ModalBody>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!formData) {
                              setUploadError("Please select an image");
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
                            {uploadingImage ? (
                              <Spinner />
                            ) : (
                              <Button type="submit">Upload</Button>
                            )}

                            {uploadError ? (
                              <Text className="image-error-message">
                                {uploadError}
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
