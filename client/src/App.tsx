import Domain from "./pages/domain/Domain";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashHome from "./pages/dash-home/DashHome";
import DashSubmit from "./pages/dash-submit/DashSubmit";
import DashCountries from "./pages/dash-countries/DashCountries";
import Country from "./pages/country/Country";
import Exit from "./pages/exit/Exit";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { ExitDataContext } from "./context/ExitDataContext";
import { useState, useMemo, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

function App() {
  const [exitDataContext, setExitDataContext] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");

  const url = `http://localhost:8000/exits/reviewed`;

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await axios.get(url)) as AxiosResponse;
        setExitDataContext(data);
      } catch (err: any) {
        onOpen();
        setModalErrorMessage("Please try again or contact us.");
      }
    })();
  }, []);

  const exitsData = useMemo(
    () => ({ exitDataContext, setExitDataContext }),
    [exitDataContext, setExitDataContext]
  );

  return (
    <div
      className="app"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <ExitDataContext.Provider value={exitsData}>
        <Routes>
          <Route path="" element={<Domain />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<DashHome />} />
          <Route path="submit" element={<DashSubmit />} />
          <Route path="countries" element={<DashCountries />} />
          <Route path="countries/:country_code" element={<Country />} />
          <Route path="countries/:country_code/:exit_id" element={<Exit />} />
        </Routes>
      </ExitDataContext.Provider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal" bg={bg_500}>
          <ModalHeader className="modal-header" color="red">
            Server Error
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalErrorMessage}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
