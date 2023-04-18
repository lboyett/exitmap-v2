import Domain from "./pages/domain/Domain";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashHome from "./pages/dash-home/DashHome";
import DashSubmit from "./pages/dash-submit/DashSubmit";
import DashCountries from "./pages/dash-countries/DashCountries";
import Country from "./pages/country/Country";
import Exit from "./pages/exit/Exit";
import ContactUs from "./pages/contact-us/ContactUs";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { ExitDataContext } from "./context/ExitDataContext";
import { UserContext } from "./context/UserContext";
import getCurrentUser from "./utils/getCurrentUser";
import { useState, useMemo, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import ChangePassword from "./pages/change-password/ChangePassword";

function App() {
  const [exitDataContext, setExitDataContext] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (err) {
        navigate("/login");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const url = `http://localhost:8000/exits/reviewed`;
        const { data } = (await axios.get(url)) as AxiosResponse;
        setExitDataContext(data);
      } catch (err: any) {
        console.log(err);
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
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Routes>
      </ExitDataContext.Provider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal" bg={bg_500}>
          <ModalHeader className="modal-header" color="red">
            Network Error
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalErrorMessage}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
