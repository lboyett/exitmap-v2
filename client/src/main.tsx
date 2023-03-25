import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import { theme } from "./assets/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserProvider>
        <App />
        </UserProvider>
      </ChakraProvider>
    </React.StrictMode>
  </BrowserRouter>
);
